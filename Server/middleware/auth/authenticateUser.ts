import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    (req as any).user = decoded as JwtPayload;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
    return
  }
};
