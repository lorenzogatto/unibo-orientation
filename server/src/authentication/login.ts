import * as HttpStatus from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { encryptPassword } from "../utils";
import { Configuration } from "../conf";
import { Db } from "mongodb";

/**
 * Checks the presence of a user and its password saved in the database.
 * Returns a JWT tokento the user if login succeeded.
 * @param req
 * @param res
 * @param db
 */
export function loginHandler(req: Request, res: Response, db: Db) {
    var email = req.body.email;
    var password = req.body.password;
    db.collection("users").findOne({ email: email }, (err, user) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        if (!user) {
            res.send(JSON.stringify({ feedback: "e-mail not used for any account"}));
            return;
        }
        if (user.activated === false) {
            res.send(JSON.stringify({ feedback: "account not activated" }));
            return;
        }
        //checking password
        var db_enc_password = user.password;
        var db_salt = user.salt;
        var expected_enc_password = encryptPassword(password, db_salt);
        if (expected_enc_password !== db_enc_password) {
            res.send(JSON.stringify({ feedback: "wrong password"}));
            return;
        }
        var token = jwt.sign(user, Configuration.getJWTSecret());
        let userView = {
            username: user.username,
            email: user.email
        }
        res.send(JSON.stringify({feedback: "ok", token: token, user:userView}));
    });
}