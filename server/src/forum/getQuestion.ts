import * as HttpStatus from 'http-status-codes';
import { ObjectId } from "bson";
import { Request, Response } from "express";
import { Db } from "mongodb";

/**
 * Get a question by req.query["id"] from the database
 * @param req
 * @param res
 * @param db
 */
export function getForumQuestionHandler(req: Request, res: Response, db: Db) {
    let id = req.query["id"];
    let _id = new ObjectId(id);
    console.log(id);
    db.collection("forum_questions").findOne({ _id: _id }, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        if (!result) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }
        res.send(JSON.stringify(result));
    });
}