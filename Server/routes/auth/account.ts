import { Router, Request, Response, NextFunction } from 'express';
import { authenticateUser  } from '@middleware/index';
import UserModel from '@models/userModel';

const router = Router();

router.use(authenticateUser)

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user  = (req as any).user // Returns email and ID

    const existingUser = await isExistingUser(user.id)

    res.status(200).json({success: true, authenticated: true, user: existingUser})
  

  } catch (error) {
    next(error)
  }
});

//Import Delete Route

// /auth/account/delete
import deleteRouter from '@routes/auth/delete'
import isExistingUser from '@utils/mongoose/isExistingUser';
router.use('/delete', deleteRouter)

import emailRouter from '@routes/auth/verifyEmail'
router.use('/verify', emailRouter)

import emailChangeRouter from '@routes/auth/changeEmail'
router.use('/change-email', emailChangeRouter)

import passwordChangeRoute from '@routes/auth/changePassword'
router.use('/change-password', passwordChangeRoute)

export default router;
