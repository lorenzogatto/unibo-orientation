import { Configuration } from "./conf";

var crypto = require('crypto');


export function sha256(data) {
    return crypto.createHash("sha256").update(data).digest("base64");
}

export function encryptPassword(password, salt) {
    return sha256(password + salt);
}