import { Router, Request, Response, NextFunction } from 'express';
import { authenticateUser  } from '@middleware/index';
import UserModel from '@models/userModel';
import VerifyEmailModel from '@models/emailVerifyModel';
import { sendVerificationCode } from '@services/nodemailer/emailVerification';
import { generateVerificationCode } from '@utils/math/GenerateVericationCode';

const router = Router();


router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    const code = generateVerificationCode();  // Generate a new verification code

    // Send the verification code via email
    await sendVerificationCode(user.email, code);

    // Check if a verification record for this email already exists
    const existingCode = await VerifyEmailModel.findOne({ email: user.email });

    if (!existingCode) {
      // If no verification record exists, create a new one
      const VerifyEmailModelObject = new VerifyEmailModel({
        email: user.email,
        code: code,  // Store the generated verification code
      });
      await VerifyEmailModelObject.save();  // Save the new record
      res.status(201).json({ success: true, message: 'Verification code created', code: code });
      return;
    }

    // If a record already exists, update the code field with the new code
    await VerifyEmailModel.findOneAndUpdate(
      { email: user.email },  // Query by user's email
      { code: code },  // Update the code field
      { new: true }  // Return the updated document (optional)
    );

    res.status(200).json({ success: true, message: 'Verification code updated',  code: code });
  } catch (error) {
    next(error);
  }
});





router.post('/verify', async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const user = (req as any).user;
    const { userCode } = req.body;

    // Find the verification code associated with the user's email
    const findCode = await VerifyEmailModel.findOne({ email: user.email });

    if (!findCode) {
        res.status(400).json({ error: 'Verification code not found' });
        return
    }

    // Check if the provided code matches the stored code
    if (findCode.code !== userCode) {
       res.status(400).json({ error: 'Invalid verification code' });
       return
    }

    await UserModel.findOneAndUpdate(
      { email: user.email },  // Query to find the user
      { emailVerified: true },  // Update emailVerified to true
      { new: true }  // Return the updated user (optional)
    );

    await VerifyEmailModel.findOneAndDelete({ email: user.email });

    res.status(200).json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    // next(error);
  }
});




export default router;

