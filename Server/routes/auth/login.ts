import express, { Router, Request, Response, NextFunction } from 'express';
import UserModel from '@models/userModel';
import mongoose from 'mongoose';  // Import mongoose to use ObjectId type
import hashCompare from '@utils/hashing/hashCompare';
import { generateToken } from '@utils/jwt/generateToken';
import { requestLogger } from '@middleware/index';

const router = Router();

router.post('/', requestLogger, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ error: 'Email and Password are required' });
      return
    }

    // Find the user by email
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      res.status(401).json({ error: 'User not found' });
      return
    }

    await hashCompare({ existingString: existingUser.password, input: password });

    const userId = existingUser._id as mongoose.Types.ObjectId;

    const token = generateToken(userId, existingUser.email);

    // Send the token as the response
    res.status(200).json({ success: true, token });
    return
  } catch (error) {
    next(error);
  }
});

export default router;
