import { Router, Request, Response, NextFunction } from 'express';
import UserModel  from '@models/userModel';

const router = Router();

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({error: "Email and Password is required"})
      throw new Error('Email and password are required');  
    }

    // Assume login logic goes here (e.g., checking the database)
    const existingUser = await UserModel.findOne({email: email})

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);  
  }
});

export default router;
