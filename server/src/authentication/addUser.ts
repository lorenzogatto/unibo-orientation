import { encryptPassword } from "../utils";
import * as EmailValidator from 'email-validator';
var HttpStatus = require('http-status-codes');
import { MongoClient, Db } from "mongodb";
var crypto = require('crypto');

export function registrationHandler(req, res, db: Db) {
    if (validate(req, res) === false)
        return;
    isEmailInDb(req, res, db, () => isUserInDb(req, res, db, () => insertInDb(req, res, db)));
    
}

function validate(req, res) {
    if (req.body.password === undefined || req.body.password.length < 8) {
        res.send(JSON.stringify({ feedback: "password too short" }));
        return false;
    }
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

//callback called if email is not in db
function isEmailInDb(req, res, db, callback) {
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

function isUserInDb(req, res, db, callback) {
    db.collection("users").find({ email: req.body.username }).toArray((err, result) => {
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

function insertInDb(req, res, db) {
    var newUser = req.body;
    newUser.salt = crypto.randomBytes(4).toString('base64');
    newUser.activated = true;//TODO send email for activation
    newUser.password = encryptPassword(newUser.password, newUser.salt);
    newUser.notifications = 0;
    db.collection("users").insert(newUser, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ feedback: "ok" }));
    });
}