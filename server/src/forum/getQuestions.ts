import * as HttpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { Db } from "mongodb";

/**
 * Get questions from the database.
 * If user is not logged in, the last 100 questions are retrieved.
 * Otherwise, the user's question are returned first and the last questions afterwards (until reaching 100).
 * @param req
 * @param res
 * @param db
 */
export function getForumQuestionsHandler(req: Request, res: Response, db: Db) {
    let query = req.body.query;
    if (query === "") {
        let q = {};
        if ((<any>req).decoded) {
            q = { username: { $ne: (<any>req).decoded.username } };
        }
        db.collection("forum_questions").find(q).sort({ datetime: -1 }).limit(100).toArray(function (err, result) {
            if (err) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            if ((<any>req).decoded) {
            let username = (<any>req).decoded.username;
                db.collection("forum_questions").find({ username: username }).sort({ datetime: -1 }).limit(100).toArray(function (err, result2: any[]) {
                    if (err) {
                        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                        return;
                    }
                    result2 = result2.concat(result);
                    result2 = result2.slice(0, 100);
                    res.send(result2);
                });
            } else {
                res.send(result);
            }
        });
    } else {
        db.collection("forum_questions").find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } }).limit(100).toArray(function (err, result) {
            if (err) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            res.send(result);
        });
    }
}