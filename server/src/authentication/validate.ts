import * as HttpStatus from 'http-status-codes';
import * as express from "express";

export function validateEmail(req: express.Request, res: express.Response, db) {
    var token = req.query["token"];
    console.log(token);
    db.collection("users").findOneAndUpdate({ activationToken: token }, { $set: { activated: true } }, (err, user) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        res.redirect("/user/login?validate=true");
    });
}