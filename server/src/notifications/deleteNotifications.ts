import * as HttpStatus from 'http-status-codes';
import { ObjectId } from "bson";

export function deleteNotification(req, res, db) {
    let email = req.decoded.email;
    let notification_id = new ObjectId(req.query["id"]);
    console.log("delete", email, notification_id)
    db.collection("users").findOneAndUpdate({ email: email }, { $pull: { notifications: { _id: notification_id } } }, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        console.log(result);
        res.sendStatus(HttpStatus.OK);
    });
}