import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";


const app = express();

// Allowing cross origin access with server to server communication
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
});