import * as HttpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { Db } from "mongodb";

/**
 * Function called when the user clicks the link he receives by e-mail.
 * @param req
 * @param res
 * @param db
 */
export function validateEmail(req: Request, res: Response, db: Db) {
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