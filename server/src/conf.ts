import fs = require('fs');

export class Configuration {
    static conf: any;
    //static initialized = false;

    static inizialize() {
        console.log("Reading configuration");
        var conf = fs.readFileSync('c:/unibo-orientation/configuration.json', 'utf8');
        console.log(conf);
        Configuration.conf = JSON.parse(conf);
        if (Configuration.conf.databaseConnectionString === undefined) {
            console.error("Error loading connection string (databaseConnectionString) in configuration file");
            process.exit(1);
        }
        if (Configuration.conf.JWTsecret === undefined) {
            console.error("Error loading password JWT secret (JWTsecret) in configuration file");
            process.exit(1);
        }
    }

    static getDatabaseConnectionString() {
        return Configuration.conf.databaseConnectionString;
    }

    static getJWTSecret() {
        return Configuration.conf.JWTsecret;
    }
}
Configuration.inizialize();