import mysql from "mysql";
import dbConfiguration from './Configuration/db.config.js'

const con = mysql.createConnection({
    HOST: dbConfiguration.dbHost,
    USER: dbConfiguration.dbUser,
    PASSWORD: dbConfiguration.dbPassword,
    DB: dbConfiguration.dbName,
    /*PORT: dbConfiguration.dbPort*/
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Mysql connected successfully");
});
