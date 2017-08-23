import * as HttpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { Db } from "mongodb";

export function putAnswersHandler(req: Request, res: Response, db: Db) {
    let email = (<any>req).decoded.email;
    db.collection("user_answers").remove({email: email}, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        db.collection("user_answers").insert({ email: email, answers: req.body }, (err, result) => {
            if (err) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send();
        });
    });
}