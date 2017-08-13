import * as express from "express";
import { MongoClient, Db } from "mongodb";
var path = require('path');
import * as HttpStatus from 'http-status-codes';
var bodyParser = require('body-parser')
import * as EmailValidator from 'email-validator';
import * as jwt from 'jsonwebtoken';

import { Configuration } from "./conf";
import { registrationHandler } from "./authentication/addUser";
import { loginHandler } from "./authentication/login";
import { getCoursesHandler } from "./courses/get_courses";
import { getQuestionsHandler } from "./questionnaire/get_questions";
import { putAnswersHandler } from "./questionnaire/put_answers";
import { getResultHandler } from "./questionnaire/get_result";
import { postForumQuestionHandler } from "./forum/postQuestion";
import { getForumQuestionsHandler } from "./forum/getQuestions";
import { postForumReplyHandler } from "./forum/postReply";
import { getReplyNumberSSE } from "./notifications/notifications";
import { resetNotifications } from "./notifications/resetNotifications";
import { getForumQuestionHandler } from "./forum/getQuestion";


var app = express();
var _public = __dirname + "/../static/";
var databaseConnectionString: string = Configuration.getDatabaseConnectionString();
var db: Db = null;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/api/get_courses', (req, res) => getCoursesHandler(req, res, db));
app.post('/api/user/register', (req, res) => registrationHandler(req, res, db));
app.put('/api/user/login', (req, res) => loginHandler(req, res, db));

app.use('/', express.static(_public));
app.get('/home', (req, res) => res.sendFile(path.join(_public + "index.html")));
//TODO
app.get('/api/forum/get_question', (req, res) => getForumQuestionHandler(req, res, db));
app.get('/api/notifications/get_new_replies_number', (req, res) => getReplyNumberSSE(req, res, db));


app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.params['token'] || req.headers['x-access-token'];
    // decode token
    if (token) {
        //console.log("token", token);
        // verifies secret and checks exp
        jwt.verify(token, Configuration.getJWTSecret(), function (err, decoded) {
            if (err) {
                return res.status(HttpStatus.UNAUTHORIZED).send(JSON.stringify({ feedback: "invalid token" }));
            } else {
                // if everything is good, save to request for use in other routes
                (<any>req).decoded = decoded;
                next();
            }
        });
    } else {
        next();
    }
});
/**
 * Pages with optional login
*/
app.put('/api/forum/get_questions', (req, res) => getForumQuestionsHandler(req, res, db));

app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.params['token'] || req.headers['x-access-token'];
    // decode token
    if (!token) {
        // if there is no token
        // return an error
        return res.status(HttpStatus.UNAUTHORIZED).send({ feedback: 'no token found' });
    } else {
        next();
    }
});

/**
 * RESTRICTED PAGES
*/
app.get('/api/questionnaire/get_questions', (req, res) => getQuestionsHandler(req, res, db));
app.get('/api/questionnaire/get_result', (req, res) => getResultHandler(req, res, db));
app.put('/api/questionnaire/put_answers', (req, res) => putAnswersHandler(req, res, db));

app.post('/api/forum/post_question', (req, res) => postForumQuestionHandler(req, res, db));
app.post('/api/forum/post_reply', (req, res) => postForumReplyHandler(req, res, db));
app.get('/api/notifications/reset', (req, res) => resetNotifications(req, res, db));


console.log("Connecting to MongoDB...");
MongoClient.connect(databaseConnectionString).then((dbx) => {
    console.log("MongoDB connected!");
    db = dbx;
    app.listen(3000, function () {
        console.log("Example app listening on port 3000!");
    });
}).catch(() => {
    console.log("Error connecting to MongoDB!");
});;
