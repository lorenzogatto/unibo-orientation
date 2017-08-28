import fs = require('fs');
var prompt = require('prompt-sync')();

var configurationFile = 'c:/unibo-orientation/configuration.json';

export class Configuration {
    private static conf: any;

    static inizialize() {
        console.log("Reading configuration");
        let conf = fs.readFileSync(configurationFile, 'utf8');
        Configuration.conf = JSON.parse(conf);
        //console.log(Configuration.conf);
        if (Configuration.conf.databaseConnectionString === undefined) {
            console.error("Error loading connection string (databaseConnectionString) in configuration file");
            process.exit(1);
        }
        if (Configuration.conf.JWTsecret === undefined) {
            console.error("Error loading password JWT secret (JWTsecret) in configuration file");
            process.exit(1);
        }
        if (Configuration.conf.port === undefined) {
            console.error("Error loading port (port) in configuration file");
            process.exit(1);
        }
        if (Configuration.conf.nat_external_port === undefined) {
            console.error("Error loading NAT external port (nat_external_port) in configuration file");
            process.exit(1);
        }
        if (Configuration.conf.email === undefined) {
            console.error("Error loading email in configuration file");
            process.exit(1);
        }
        if (Configuration.conf.email.auth === undefined || Configuration.conf.email.auth.user === undefined) {
            console.error("Error loading email user (email.auth.user) in configuration file");
            process.exit(1);
        }
        Configuration.conf.email.auth.pass = prompt.hide("Insert password for email " + Configuration.conf.email.auth.user + ": ");
    }

    static getDatabaseConnectionString() {
        return Configuration.conf.databaseConnectionString;
    }

    static getJWTSecret() {
        return Configuration.conf.JWTsecret;
    }
    static getPort() {
        return Configuration.conf.port;
    }
    static getNatPort() {
        return Configuration.conf.nat_external_port;
    }
    static getEmail() {
        return Configuration.conf.email;
    }
}
Configuration.inizialize();
