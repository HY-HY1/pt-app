import mongoose from 'mongoose';
import { config } from './env'; // Import the configuration from env.ts

export const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the application on failure
    }
};
