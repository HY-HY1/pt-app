import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

interface EnvConfig {
    MONGO_URI: string;
    PORT: number;
    JWT_SECRET: string;
    STRIPE_SECRET_KEY: string;
    SENDGRID_API_KEY: string;
}

const getEnvVariable = (key: string, fallback?: string): string => {
    const value = process.env[key] || fallback;
    if (!value) {
        throw new Error(`Missing environment variable: ${key}`);
    }
    return value;
};

export const config: EnvConfig = {
    MONGO_URI: getEnvVariable('MONGO_URI'),
    PORT: parseInt(getEnvVariable('PORT', '3000')),
    JWT_SECRET: getEnvVariable('JWT_SECRET'),
    STRIPE_SECRET_KEY: getEnvVariable('STRIPE_SECRET_KEY'),
    SENDGRID_API_KEY: getEnvVariable('SENDGRID_API_KEY')
};
