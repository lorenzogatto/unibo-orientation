import * as HttpStatus from 'http-status-codes';
var jwt = require('jsonwebtoken');

import { encryptPassword } from "../utils";
import { Configuration } from "../conf";

export function loginHandler(req, res, db) {
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
        //check password
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