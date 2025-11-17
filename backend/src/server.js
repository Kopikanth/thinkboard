import express from "express";
import cors from 'cors';
import notesRouter from "./routes/notes.route.js";
import connectDb from "../config/db.js";
import { PORT } from "../env.js";
import rateLimiter from "../middlewares/rateLimiter.middleware.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(rateLimiter);
app.use(express.json());

app.use('/api/v1/notes', notesRouter);

const startServer = async ()=>{
    await connectDb();
    app.listen(PORT || 5001, ()=>{
        console.log(`Server is running on port: ${PORT}`);
    });
};

startServer();