import * as HttpStatus from 'http-status-codes';

export function getResultHandler(req, res, db) {
    let email = req.decoded.email;
    console.log(email);
    db.collection("user_answers").findOne({ email: email }, (err, result1) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        if (!result1) {
            res.sendStatus(HttpStatus.NOT_FOUND);
            return;
        }

        db.collection("answers").find().toArray((err, result: any[]) => {
            if (err) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            let userAnswers = result1.answers;
            let questions: string[] = Object.keys(userAnswers);
            for (let coursesGroup = 0; coursesGroup < result.length; coursesGroup++) {
                let expectedAnswers = result[coursesGroup].answers;
                //console.log(expectedAnswers);
                let difference = 0;
                for (let i = 0; i < questions.length; i++) {
                    let answered = userAnswers[questions[i]];
                    let expected = expectedAnswers[questions[i]];
                    difference += Math.abs(answered - expected);
                }
                result[coursesGroup].difference = difference;
            }
            result.sort((a, b) => a.difference - b.difference);
            res.setHeader('Content-Type', 'application/json');
            res.send(result.slice(0, 3));
        });
    });
    
}