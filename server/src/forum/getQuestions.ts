var HttpStatus = require('http-status-codes');

export function getForumQuestionsHandler(req, res, db) {
    let query = req.body.query;
    //console.warn("query" + query);
    if (query === "") {

        let q = {};
        if (req.decoded) {
            q = { username: { $ne: req.decoded.username } };
        }
        db.collection("forum_questions").find(q).sort({ datetime: -1 }).limit(100).toArray(function (err, result) {
            if (err) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            if (req.decoded) {
                let username = req.decoded.username;
                db.collection("forum_questions").find({ username: username }).sort({ datetime: -1 }).limit(100).toArray(function (err, result2: any[]) {
                    if (err) {
                        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                        return;
                    }
                    result2 = result2.concat(result);
                    result2 = result2.slice(0, 100);
                    res.send(result2);
                });
            } else {
                res.send(result);
            }
        });
    } else {
        db.collection("forum_questions").find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
            .sort({ score: { $meta: "textScore" } }).limit(100).toArray(function (err, result) {
            if (err) {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                return;
            }
            res.send(result);
        });
    }
}