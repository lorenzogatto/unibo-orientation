var HttpStatus = require('http-status-codes');

export function getCoursesHandler(req, res, db) {
    console.time("db get courses");
    db.collection("courses").find().toArray((err, result) => {
        if (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }
        console.timeEnd("db get courses");
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'max-age=1000');
        res.send(JSON.stringify({ data: result }));
    });
}