import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3008
const ASSISTANT_ID = process.env.ASSISTANT_ID || ''
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN || ''
const MONGODB_URI = process.env.MONGODB_URI || ''
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const SHOPIFY_API_URL = process.env.SHOPIFY_API_URL || ''
const PRODUCTION = process.env.PRODUCTION || false

export {
    PORT,
    ASSISTANT_ID,
    SHOPIFY_ACCESS_TOKEN,
    MONGODB_URI,
    OPENAI_API_KEY,
    SHOPIFY_API_URL,
    PRODUCTION
};