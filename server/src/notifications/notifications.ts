import * as express from "express";
import * as HttpStatus from 'http-status-codes';

export function getReplyNumberSSE(req: express.Request, res: express.Response, db) {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    var timer;
    let email = validate(req.query["email"]);
    if (!email) {
        res.sendStatus(HttpStatus.BAD_REQUEST);
        return;
    }
    sendEvent(email, res, db);
    timer = setInterval(() => {
            sendEvent(email, res, db);
    }, 5000);
    req.on('close', () => clearTimeout(timer));
    req.on('error', () => clearTimeout(timer));
}


function sendEvent(email, res, db) {
    db.collection("users").findOne({ email: email }, (err, result) => {
        if (err) {
            return;
        }
        console.log(result.notifications);
        if(typeof result.notifications !== "undefined")
            res.write("data: " + result.notifications+ "\n\n");
    });
}

export function addNotitication(email, db) {
    db.collection("users").findOneAndUpdate({ email: email }, { $inc: { notifications: 1 } }, (err, result) => {
        if (err) {
            console.log("Couldn't add notification for " + email);
            console.log(err);
        }
    });
}

function validate(email) {
    if (!email) return "";
    email = email.trim();
    return email;
}