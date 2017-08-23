import { ObjectId } from "bson";
import * as HttpStatus from 'http-status-codes';
import { addNotitication } from "../notifications/notifications";
import { Request, Response } from "express";
import { Db } from "mongodb";

/**
 * Post a reply to a question
 * @param req
 * @param res
 * @param db
 */
export function postForumReplyHandler(req: Request, res: Response, db: Db) {
    console.warn("Updating reply");
    let email = (<any>req).decoded.email;
    //TODO only unibo e-mails
    let username = (<any>req).decoded.username;
    let reply = req.body;
    let replyText = reply.reply;
    let question_id = new ObjectId(reply._id);
    let reply_datetime = new Date().getTime();

    console.log(question_id);
    console.log(replyText);
    db.collection("forum_questions").findOneAndUpdate({ _id: question_id, reply: "" },
        { $set: { "reply": replyText, "reply_username": username, "reply_email": email, "reply_datetime": reply_datetime } }
        , (err, result) => {
            if (err) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            if (result.lastErrorObject.n !== 1) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            console.log(result);
            res.sendStatus(HttpStatus.OK);
            let notification = {
                _id: result.value._id,
                type: 'newanswer',
                data: {
                    question: result.value.question,
                    question_id: result.value._id
                }
            };
            addNotitication(result.value.email, notification, db);
        });
}

/**
 * Validate user data before inserting a new reply.
 * @param replyText
 */
function validate(replyText: string) {
    let text: string = replyText.trim();
    
    let text_lines = text.split(/\r\n|\r|\n/).length;
    if (text.length === 0 || text.length > 200 || text_lines > 5) {
        return false;
    }
    return true;
}