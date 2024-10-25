import express from 'express';
import cors from 'cors';
import { connectDB } from './config/Mongoose';
import authRouter from './routes/auth';  // Import the combined auth router
import paymentRouter from './routes/payment'
import { errorHandler, requestLogger, validateRequest } from './middleware/index';  // Ensure this path is correct

export const app = express();

app.use(cors());
app.use(express.json());  // Middleware for parsing JSON

connectDB(); 

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/auth', authRouter);
app.use('/payment', paymentRouter)

app.use(errorHandler);
app.use(requestLogger)
app.use(validateRequest)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
