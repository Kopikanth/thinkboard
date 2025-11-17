import dotenv from 'dotenv';

dotenv.config();

export const {
    db_password,
    db_username,
    MONGO_URI,
    PORT
} = process.env;