import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;  // Allow `req.user` to be a string or a JWT payload
    }
  }
}
