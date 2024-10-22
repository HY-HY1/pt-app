import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  role: string;
}

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Fallback using `as any` to bypass TypeScript if needed
    const user = (req as any).user as UserPayload;

    // Ensure `user` exists and has a role
    if (user && user.role === role) {
      return next();  // If authorized, continue to the next middleware
    }

    // If the user is not authorized, send a 403 error
    return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
  };
};
