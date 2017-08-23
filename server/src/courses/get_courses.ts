import * as HttpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { Db } from "mongodb";

export function getCoursesHandler(req: Request, res: Response, db: Db) {
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