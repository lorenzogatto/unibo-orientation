import * as HttpStatus from 'http-status-codes';

export function resetNotifications(req, res, db) {
    let email = req.decoded.email;
	console.log("reset", email)
	db.collection("users").findOneAndUpdate({ email: email }, { $set: { notifications: 0 } }, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        res.sendStatus(HttpStatus.OK);
    });
}