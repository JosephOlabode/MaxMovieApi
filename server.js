import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";
import http from 'http';
import generalErrorHandler from './Error/general-error-handler.js';

const app = express();


//connecting the mysql database
import('./db.js');

// Allowing cross origin access with server to server communication
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// this creates an express server.
const server = http.createServer(app);

// defining a constant port number
const PORT = process.env.PORT || 3000;

// this allows parsing of json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// default route for checking if the server is responding
app.use('/',  (req, res, next) =>{
    res.send("Max movie server is working");
});


// general error handler for the server
app.use(generalErrorHandler);

// starting the server
server.listen(PORT, () => {
    console.log("Server Listening on Port: "+ PORT);
});