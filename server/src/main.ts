require('app-module-path').addPath("build/");
import * as express from "express";
var path = require('path');
import { MongoClient, Db } from "mongodb";
var HttpStatus = require('http-status-codes');
let app = express();
let _public = __dirname + "/../static/";
let uri = "mongodb://lorenzo:PWD@unibo-orientation-cluster-shard-00-00-p2i0j.mongodb.net:27017,unibo-orientation-cluster-shard-00-01-p2i0j.mongodb.net:27017,unibo-orientation-cluster-shard-00-02-p2i0j.mongodb.net:27017/unibo-orientation?ssl=true&replicaSet=unibo-orientation-cluster-shard-0&authSource=admin";
let db: Db = null;



app.get('/api/get_courses', function (req, res) {
    console.time("dbQuery");
    db.collection("courses").find().toArray((err, result) => {
        if (err) res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        else {
            console.timeEnd("dbQuery");
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'max-age=1000');
            res.send(JSON.stringify({ data: result }));
        }
    });
});

app.use('/', express.static(_public));
/*app.get('/', function (req, res) {
    res.sendFile(path.join(_public + "index.html"));
});*/


MongoClient.connect(uri).then((dbx) => {
    console.log("MongoDB connected!");
    db = dbx;
    app.listen(3000, function () {
        console.log("Example app listening on port 3000!");
    });
}).catch(() => {
    console.log("Error connecting to MongoDB!");
});;
