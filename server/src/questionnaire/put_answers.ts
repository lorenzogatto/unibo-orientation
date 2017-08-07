var HttpStatus = require('http-status-codes');

export function putAnswersHandler(req, res, db) {
    let email = req.decoded.email;
    db.collection("user_answers").remove({email: email}, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        db.collection("user_answers").insert({ email: email, answers: req.body }, (err, result) => {
            if (err) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.send();
        });
    });
}