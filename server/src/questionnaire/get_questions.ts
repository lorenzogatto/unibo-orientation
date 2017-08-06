var HttpStatus = require('http-status-codes');

export function getQuestionsHandler(req, res, db) {
    console.time("dbQuery");
    db.collection("questions").find().toArray((err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
		}
        console.timeEnd("dbQuery");
        res.setHeader('Content-Type', 'application/json');
        //res.setHeader('Cache-Control', 'max-age=1000');
        res.send(JSON.stringify({ data: result }));
    });
}