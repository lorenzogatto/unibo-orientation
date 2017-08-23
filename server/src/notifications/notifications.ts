import { Request, Response } from "express";
import * as HttpStatus from 'http-status-codes';
import { Db } from "mongodb";

var connections = {};

/**
 * Get notifications with Server-sent events
 * @param req
 * @param res
 * @param db
 */
export function getNotificationsSSE(req: Request, res: Response, db: Db) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    let email = validate(req.query["email"]);
    if (!email) {
        res.sendStatus(HttpStatus.BAD_REQUEST);
        return;
    }
    console.log(email +" listening to notifications");
    connections[email] = res;
    sendAllNotifications(email, res, db);
    req.on('close', () => delete connections[email]);
    req.on('error', (err) => {
        console.log(err);
        delete connections[email]
    });
}

/**
 * Send all notifications present in the database to the user specified by email
 * @param email
 * @param res
 * @param db
 */
function sendAllNotifications(email, res: Response, db: Db) {
    db.collection("users").findOne({ email: email }, (err, result) => {
        if (err || !result) {
            return;
        }
        let notifications: any[] = result.notifications;
        console.log(notifications);
        for (let i = 0; i < notifications.length; i++) {
            sendNotification(email, notifications[i]);
        }
    });
}

/**
 * Sends a single notification to the user specified by email
 * @param email
 * @param notification
 */
function sendNotification(email, notification) {
    let res: Response = connections[email];
    if (res) {
        res.write("data: " + JSON.stringify(notification) + "\n\n");
    }
}

/**
 * Add a notification in the DB and sends it to the user if he is logged.
 * @param email
 * @param notification
 * @param db
 */
export function addNotitication(email, notification, db) {
    if (!notification._id) {
        return;
    }
    db.collection("users").findOneAndUpdate({ email: email }, { $push: { notifications: notification } }, (err, result) => {
        if (err) {
            console.log("Couldn't add notification for " + email);
            console.log(err);
        }
        sendNotification(email, notification);
    });
}

/**
 * Validate e-mail.
 * It just trims it because e-mail should be alread be validated, as the user is logged in.
 * @param email
 */
function validate(email: string) {
    if (!email) return "";
    email = email.trim();
    return email;
}