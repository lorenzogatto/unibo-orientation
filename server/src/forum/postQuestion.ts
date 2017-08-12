import * as HttpStatus from 'http-status-codes';

export function postForumQuestionHandler(req, res, db) {
    console.warn("Post new question");
    let email = req.decoded.email;
    let username = req.decoded.username;
    let question = req.body;
    if (validate(question) === false) {
        res.sendStatus(HttpStatus.BAD_REQUEST);
        return;
    }
    question.email = email;
    question.username = username;
    question.reply = "";
    question.datetime = new Date().getTime();
    db.collection("forum_questions").insert(question, (err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        res.sendStatus(HttpStatus.OK);
    });
}

function validate(question) {
    let text: string = question.question;
    let details: string = question.details;
    text = text.trim();
    details = details.trim();

    let text_lines = text.split(/\r\n|\r|\n/).length;
    let details_lines = details.split(/\r\n|\r|\n/).length;
    if (text.length === 0 || text.length > 100 || text_lines > 1 ||
        details.length > 200 || details_lines > 5) {
        return false;
    }
    return true;
}