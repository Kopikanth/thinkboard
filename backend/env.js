import dotenv from 'dotenv';

dotenv.config();

export const {
    MONGO_URI,
    PORT,
    UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN,
    NODE_ENV
} = process.env;