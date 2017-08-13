var HttpStatus = require('http-status-codes');
import { ObjectId } from "bson";


export function getForumQuestionHandler(req, res, db) {
    let id = req.query["id"];
    let _id = new ObjectId(id);
    console.log(id);
    db.collection("forum_questions").findOne({ _id: _id }, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        console.log(result);
        res.send(result);
    });
}