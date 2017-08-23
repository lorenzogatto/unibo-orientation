import { encryptPassword, sha256 } from "../utils";
import * as EmailValidator from 'email-validator';
import * as HttpStatus from 'http-status-codes';
import { MongoClient, Db } from "mongodb";
import { Configuration } from "../conf";
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { Request, Response } from "express";

export function registrationHandler(req: Request, res: Response, db: Db) {
    if (validate(req, res) === false)
        return;
  
    isEmailUnusedInDb(req, res, db, () => {
        isUserInDb(req, res, db, () => {
            insertInDb(req, res, db);
        });
    });
}

/**
 * Validate input data.
 * Computation should go forward if this function returns true.
 * Error messages are sent to the users when this function returns false.
 * @param req
 * @param res
 */
function validate(req: Request, res: Response) {
    if (req.body.password === undefined || req.body.password.length < 8) {
        res.send(JSON.stringify({ feedback: "password too short" }));
        return false;
    }
    //trimming has to be done before checking the length
    if (req.body.username) { 
        req.body.username = req.body.username.trim();
    }
    if (req.body.username === undefined || req.body.username.length < 1) {
        res.send(JSON.stringify({ feedback: "username not present" }));
        return false;
    }
    if (req.body.email) {
        req.body.email = req.body.email.trim();
    }
    if (req.body.email === undefined || EmailValidator.validate(req.body.email) === false) {
        res.send(JSON.stringify({ feedback: "email not valid" }));
        return false;
    }
    return true;
}


/**
 * Make sure e-mail address is not already used.
 * Callback is called if email is not in db
 * @param req
 * @param res
 * @param db
 * @param callback
 */
function isEmailUnusedInDb(req: Request, res: Response, db: Db, callback) {
    db.collection("users").find({ email: req.body.email }).toArray((err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        if (result.length > 0) {
            res.send(JSON.stringify({ feedback: "email already taken" }));
            return;
        }
        callback();
    });
}

/**
 * Checks the username req.body.username is not present in the db
 * Callback called if not present
 * @param req
 * @param res
 * @param db
 * @param callback
 */
function isUserInDb(req: Request, res: Response, db: Db, callback) {
    db.collection("users").find({ username: req.body.username }).toArray((err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        if (result.length > 0) {
            res.send(JSON.stringify({ feedback: "username already taken" }));
            return;
        }
        callback();
    });
}

/**
 * Inserts the user in the database.
 * Password will be hashed with a random salt
 * @param req
 * @param res
 * @param db
 */
function insertInDb(req: Request, res: Response, db: Db) {
    var newUser = req.body;
    newUser.salt = crypto.randomBytes(4).toString('base64');
    newUser.activated = false;
    newUser.activationToken = sha256(newUser.email + newUser.salt);//expected to be unique for each user because email is unique
    newUser.password = encryptPassword(newUser.password, newUser.salt);
    newUser.notifications = [];
    db.collection("users").insert(newUser, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            console.log(err);
            return;
        }
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ feedback: "ok" }));

        sendEmail(newUser, req);
    });
}

var transporter = nodemailer.createTransport(Configuration.conf.email);
function sendEmail(newUser, req: Request) {
    let hostname = req.hostname;
    let protocol = req.protocol;
    let port = req.socket.localPort;

    console.log(newUser.activationToken);
    let mailContent = "Per verificare il suo indirizzo e-mail, clicchi \
<a href='"+ protocol + "://" + hostname + ":" + port + "/validate?token=" + encodeURIComponent(newUser.activationToken) + "'>qui</a>";

    // setup email data with unicode symbols
    let mailOptions = {
        from: Configuration.conf.email.auth.user,
        to: newUser.email, // list of receivers
        subject: 'Registrazione orientamento unibo', // Subject line
        html: mailContent // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}