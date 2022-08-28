import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import getWords from './controllers/getWords';

// Instantiating Express Instance
const app = express();

// Middlewares
// Using Body Parser
app.use(express.json());

// Managing CORS
app.use(cors());

// Setting env variables
dotenv.config({path: path.resolve(__dirname + `/config/${process.env.NODE_ENV}.env`)});

// Logging Requests (Development Only)
(async () => {
    if(process.env.NODE_ENV === 'dev') {
        const {default: morgan} = await import('morgan');
        app.use(morgan('dev'));
    };
})();

// Setting Routes
app.get('/words', getWords);

// Undefined Routes
app.get("*", (_, res) => res.status(404).end("Route Not Found"));

export default app;
