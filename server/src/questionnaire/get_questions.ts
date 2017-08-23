import * as HttpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { Db } from "mongodb";

/**
 * Get questionnaire questions.
 * @param req
 * @param res
 * @param db
 */
export function getQuestionsHandler(req: Request, res: Response, db: Db) {
    console.time("dbQuery");
    db.collection("questions").find().toArray((err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
		}
        console.timeEnd("dbQuery");
        res.setHeader('Content-Type', 'application/json');
        //res.setHeader('Cache-Control', 'max-age=1000');
        res.send(JSON.stringify({ data: result }));
    });
}