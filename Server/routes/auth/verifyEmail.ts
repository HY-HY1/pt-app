import { Router, Request, Response, NextFunction } from 'express';
import UserModel from '@models/userModel';
import VerifyEmailModel from '@models/emailVerifyModel';
import { sendVerificationCode } from '@services/nodemailer/emailVerification';
import { generateVerificationCode } from '@utils/math/GenerateVericationCode';
import { SaveVerificationCode } from '@services/nodemailer/SaveVerificationCode';
import { requestLogger } from '@middleware/index';
import { request } from 'http';

const router = Router();


router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    let actionType = req.body.actionType;  // Pass the action type (e.g., 'emailChange', 'passwordChange')
    const code = generateVerificationCode();  // Generate the verification code

    if(!actionType) {
      actionType = 'verify'
    }

    const findUser = await UserModel.findById(user.id)

  

    if(actionType == 'verify' && findUser?.emailVerified  ) {
      res.status(200).json({success: true, message: "Email is already Verified"})
      return
    }

    const result = await SaveVerificationCode(user.email, code, actionType) ;
    res.status(201).json(result);

  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});


router.post('/' ,requestLogger,async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const user = (req as any).user;
    const { VerificationCode, actionType } = req.body;  // Pass actionType as part of request

    // Find the verification code for the email and actionType
    const findCode = await VerifyEmailModel.findOne({ email: user.email, actionType });
    

    if (!findCode) {
      res.status(400).json({ error: 'Verification code not found', messsage: "User May Already Be Verified" });
      return;
    }
    

    // Check if the userCode matches the verification code
    if (findCode.code !== VerificationCode) {
      console.log("🚀 ~ router.post ~ VerificationCode:", VerificationCode)
      console.log("🚀 ~ router.post ~ findCode.code:", findCode.code)
      res.status(400).json({ error: 'Invalid verification code' });
      return;
    }

    console.log("userID",user)

    // Update the user's emailVerified field to true
    await UserModel.findByIdAndUpdate(
      user.id,  // Use the user ID to find the user
      { emailVerified: true },  // Update the emailVerified field
      { new: true }  // Return the updated document
    );

    // Delete the verification code after successful verification
    await VerifyEmailModel.findOneAndDelete({ email: user.email, actionType });

    // Respond with success
    res.status(200).json({ success: true, message: `${actionType} verified successfully` });
    return;
  } catch (error) {
    next(error);
    return;
  }
});



export default router;
