import { Router, Request, Response, NextFunction } from 'express';
import UserModel from '@models/userModel';
import VerifyEmailModel from '@models/emailVerifyModel';
import { sendVerificationCode } from '@services/nodemailer/emailVerification';
import { generateVerificationCode } from '@utils/math/GenerateVericationCode';
import { SaveVerificationCode } from '@services/nodemailer/SaveVerificationCode';

const router = Router();


router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    let actionType = req.body.actionType;  // Pass the action type (e.g., 'emailChange', 'passwordChange')
    const code = generateVerificationCode();  // Generate the verification code

    if(!actionType) {
      actionType = 'verify'
    }

    const result = await SaveVerificationCode(user.email, code, actionType) ;

    res.status(201).json(result);
  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});


// Route to verify the code for a specific action
router.post('/', async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const user = (req as any).user;
    const { userCode, actionType } = req.body;  // Pass actionType as part of request

    const findCode = await VerifyEmailModel.findOne({ email: user.email, actionType });

    if (!findCode) {
        res.status(400).json({ error: 'Verification code not found' });
        return;
    }

    if (findCode.code !== userCode) {
       res.status(400).json({ error: 'Invalid verification code' });
       return;
    }  

    await UserModel.findByIdAndUpdate(
      user.id,
      {emailVerified: true},
      {new: true}
    )

    await VerifyEmailModel.findOneAndDelete({ email: user.email, actionType });

    res.status(200).json({ success: true, message: `${actionType} verified successfully` });
  } catch (error) {
    next(error);
  }
});

export default router;
