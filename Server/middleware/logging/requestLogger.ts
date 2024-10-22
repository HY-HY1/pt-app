import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  if (Object.keys(req.query).length > 0) {
    console.log('Query Parameters:', req.query); // Log the query parameters
  }
  if (Object.keys(req.body).length > 0) {
    console.log('Request Body:', req.body); // Log the request body
  }
  next();
};
