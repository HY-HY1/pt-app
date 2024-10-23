import { Router, Request, Response, NextFunction } from 'express';
import { authenticateUser  } from '@middleware/index';
import UserModel from '@models/userModel';
import isExistingUser from '@utils/mongoose/isExistingUser';
import { sendVerificationCode } from '@services/nodemailer/emailVerification';

const router = Router();

router.delete('/', async (req: Request, res: Response, next: NextFunction) => { // Pass Email verification as middleware
    try {
        const user = (req as any).user

        // Find Existing User To Avoid Errors

        await isExistingUser(user.id)

        // Add in email verification Function


        // await UserModel.findOneAndDelete({_id: user.id})

    } catch (error) {
        next(error)
    }
})

export default router;

