import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";
import http from 'http';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import generalErrorHandler from './Error/general-error-handler.js';
import {movieRouter} from './Routes/movie-api.js';
import {characterRouter} from './Routes/character-api.js';

const app = express();


//connecting the mysql database
//import('./db.js');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Swagger for Max Movie API',
        version: '1.0.0',
        description:
            'This is the test api for the max movie test',
        license: {
            name: 'Licensed Under MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Olabode Joseph Oluwaseun',
        },
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
        /*{
            url: "https://",
            description: 'Live server'
        }*/
    ],
};

// swagger options
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./Routes/*.js'],
};


const swaggerSpec = swaggerJSDoc(options);

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

// Routes
app.use('/api/movies', movieRouter);
app.use('/api/character', characterRouter);

// swagger api middleware
app.use('/max-movie-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// default route for checking if the server is responding
app.use('/',  (req, res, next) =>{
    res.send("Max movie server is working");
});


// general error handler for the server
app.use(generalErrorHandler);

// starting the server
const testServerInstance = server.listen(PORT, () => {
    console.log("Server Listening on Port: "+ PORT);
});


// this enable the usage of the server instance for testing purpose
export default testServerInstance;