import * as HttpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { ObjectId } from "bson";
import { Db } from "mongodb";

/**
 * Delete a notification from the DB after it has been seen by the user.
 * @param req
 * @param res
 * @param db
 */
export function deleteNotification(req: Request, res: Response, db: Db) {
    let email = (<any>req).decoded.email;
    let notification_id = new ObjectId(req.query["id"]);
    //console.log("delete", email, notification_id)
    db.collection("users").findOneAndUpdate({ email: email }, { $pull: { notifications: { _id: notification_id } } }, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        //console.log(result);
        res.sendStatus(HttpStatus.OK);
    });
}