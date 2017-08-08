var HttpStatus = require('http-status-codes');

export function postForumQuestionHandler(req, res, db) {
    let email = req.decoded.email;
    let username = req.decoded.username;
    let question = req.body;
    question.email = email;
    question.username = username;
    question.datetime = new Date().getTime();
    db.collection("forum_questions").insert(question, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        res.sendStatus(HttpStatus.OK);
    });
}