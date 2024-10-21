import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// Define the UserPayload with role
interface UserPayload extends JwtPayload {
  role: string;
}

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Ensure req.user is not a string and contains the role property
    if (req.user && typeof req.user !== 'string' && 'role' in req.user) {
      const user = req.user as UserPayload;  // Type casting to ensure req.user has role

      if (user.role === role) {
        return next();  // Role is authorized
      }
    }

    return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
  };
};
