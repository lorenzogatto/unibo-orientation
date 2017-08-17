import * as HttpStatus from 'http-status-codes';
import { ObjectId } from "bson";

export function deleteQuestion(req, res, db) {
    let email = req.decoded.email;
    let question_id = new ObjectId(req.query["id"]);
    db.collection("forum_questions").remove({ _id: question_id, email: email }, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        //maybe the question did not exist
        console.log("Risultato cancellazione domanda", result);
        res.sendStatus(HttpStatus.OK);
    });
}