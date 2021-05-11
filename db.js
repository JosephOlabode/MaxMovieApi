import mysql from "mysql";

const con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    db: "maxmovie"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Mysql connected successfully");
});
