import mongoose from 'mongoose';
import { MONGO_URI } from '../env.js';

const connectDb = async()=>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to mongoDB", error.message);
        process.exit(1);
    }
};

export default connectDb;