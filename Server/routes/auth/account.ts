import { Router, Request, Response, NextFunction } from 'express';
import { authenticateUser  } from '@middleware/index';

const router = Router();

router.get('/', authenticateUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    
  } catch (error) {
    next(error)
  }
});

export default router;
