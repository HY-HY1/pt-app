import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const generateToken = (id: mongoose.Types.ObjectId, email: string) => {
  const payload = { id, email };  // Include user ID and email in the token payload

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d',  // Set token expiration
  });

  return token;
};
