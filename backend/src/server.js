import express from "express";
import cors from 'cors';
import path from 'path';

import notesRouter from "./routes/notes.route.js";
import connectDb from "../config/db.js";
import { NODE_ENV, PORT } from "../env.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";

const app = express();
const __dirname = path.resolve();
// const filePath = path.join(__dirname, 'ewrdsfdsfvcbcvbcvb');
// console.log('hello',filePath);

if (NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173',
    }));
}
app.use(rateLimiter);
app.use(express.json());

app.use('/api/v1/notes', notesRouter);

if (NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    
    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

const startServer = async ()=>{
    await connectDb();
    app.listen(PORT || 5001, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    });
};

startServer();