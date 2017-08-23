import * as HttpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { ObjectId } from "bson";
import { Db } from "mongodb";

/**
 * Delete a question from the database.
 * Question id in req.query["id"]
 * @param req
 * @param res
 * @param db
 */
export function deleteQuestion(req: Request, res: Response, db: Db) {
    let email = (<any>req).decoded.email;
    let question_id = new ObjectId(req.query["id"]);
    db.collection("forum_questions").remove({ _id: question_id, email: email }, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        //maybe the question did not exist. in that case we return OK anyway
        //console.log("Risultato cancellazione domanda", result);
        res.sendStatus(HttpStatus.OK);
    });
}