import express from 'express';
import cors from 'cors';
import { connectDB } from './config/Mongoose';
import authRoutes from './routes/authentication'; 
import { errorHandler } from '@middleware/index';

const app = express();

app.use(cors());  
app.use(express.json());  
connectDB();


app.get('/', (req, res) => {
  res.send('API is running...');
});

//Import routes

app.use(authRoutes);

app.use(errorHandler)

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
