import * as express from "express";
import * as HttpStatus from 'http-status-codes';

var connections = {};

export function getNotificationsSSE(req: express.Request, res: express.Response, db) {
    
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

function sendAllNotifications(email, res, db) {
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

function sendNotification(email, notification) {
    let res: express.Response = connections[email];
    if (res) {
        res.write("data: " + JSON.stringify(notification) + "\n\n");
    }
}

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

function validate(email) {
    if (!email) return "";
    email = email.trim();
    return email;
}