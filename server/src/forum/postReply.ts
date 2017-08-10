import { ObjectId } from "bson";

var HttpStatus = require('http-status-codes');

export function postForumReplyHandler(req, res, db) {
    console.warn("Updating reply");
    let email = req.decoded.email;
    //TODO only unibo e-mails
    let username = req.decoded.username;
    let reply = req.body;
    let replyText = reply.reply;
    let question_id = new ObjectId(reply._id);
    console.log(question_id);
    console.log(replyText);
    db.collection("forum_questions").findOneAndUpdate({ _id: question_id, reply: "" },
        { $set: { "reply": replyText } }
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
    });
}