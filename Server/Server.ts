import express from 'express';
import cors from 'cors';
import { connectDB } from './config/Mongoose';
import authRouter from './routes/auth';  // Import the combined auth router
import { errorHandler } from './middleware/index';  // Ensure this path is correct

const app = express();

app.use(cors());
app.use(express.json());  // Middleware for parsing JSON

connectDB(); 

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/auth', authRouter);

app.use(errorHandler);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
