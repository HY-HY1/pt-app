import { Router, Request, Response, NextFunction } from 'express';
import UserModel from '@models/userModel';
import mongoose from 'mongoose';  // Import mongoose to use ObjectId type
import bcrypt from 'bcrypt';  // For password hashing
import { requestLogger } from '@middleware/index';  // Assuming you have logging middleware
import hashString from '@utils/hashing/hashString';
import { generateToken } from '@utils/jwt/generateToken';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password, gender, dateOfBirth, phone } = req.body;

    if (!firstName || !lastName || !email || !password || !gender || !dateOfBirth) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    const hashedPassword = await hashString(password);

    const newUser = new UserModel({
      name: { firstName, lastName },
      email,
      password: hashedPassword,
      demographics: {
        gender,
        dateOfBirth: new Date(dateOfBirth),
      },
      phone,
    });

    const savedUser = await newUser.save();

    const userId = savedUser._id as mongoose.Types.ObjectId;
    console.log(userId)

    const token = generateToken(userId, savedUser.email);

    res.status(201).json({ success: true, token });
    return;
  } catch (error) {
    next(error);
  }
});

export default router;
