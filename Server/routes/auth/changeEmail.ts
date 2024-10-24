import { Router, Request, Response, NextFunction } from 'express';
import { SaveVerificationCode } from '@services/nodemailer/SaveVerificationCode';  // Import the utility function
import { sendVerificationCode } from '@services/nodemailer/emailVerification';  // Assuming you already have this set up
import { generateVerificationCode } from '@utils/math/GenerateVericationCode';
import VerifyEmailModel from '@models/emailVerifyModel';
import UserModel from '@models/userModel';
import isExistingUser from '@utils/mongoose/isExistingUser';
import { generateToken } from '@utils/jwt/generateToken';


const router = Router();


//Create the request to change password or email in /auth/account/verify/create with 
// actionType: "passwordChange" or "emailChange" Verify is default


router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;  // The authenticated user
    const { verificationCode, newEmail } = req.body;

    console.log('Inputted Code', verificationCode)


    if (!newEmail) {
       res.status(400).json({ error: 'New email is required' });
       return
    }

    const existingUser = await isExistingUser(user.id);

    if (existingUser?.emailVerified === false) {
      await UserModel.findByIdAndUpdate(
        user.id,                                // Pass the user's id directly
        { email: newEmail, emailVerified: false },  // Update email and reset verification status
        { new: true }                           // Return the updated document
      );
      
      const newUpdatedUser = await UserModel.findOne({ email: newEmail });

      await VerifyEmailModel.findOneAndDelete({ email: user.email, actionType: "emailChange" });

      const token = generateToken(user.id, newEmail);

       res.status(200).json({ success: true, token, user: newUpdatedUser });
       return
    }

    if (!verificationCode) {
       res.status(400).json({ error: 'Verification code is required' });
       return
    }

    const passwordCode = await VerifyEmailModel.findOne({ email: user.email, actionType: "emailChange" });


    if (!passwordCode) {
       res.status(400).json({ error: 'You need to verify your email' });
       return
    }

    console.log('Real Code', passwordCode.code || '')
    if (passwordCode.code !== verificationCode) {
       res.status(400).json({ error: 'Verification code is incorrect' });
       return
    }

    await UserModel.findByIdAndUpdate(
      user.id,                                // Pass the user's id directly
      { email: newEmail, emailVerified: false },  // Update email and reset verification status
      { new: true }                           // Return the updated document
    );
    
    await VerifyEmailModel.findOneAndDelete({ email: user.email, actionType: "emailChange" });

    const newUser = await UserModel.findById(user.id);

    const token = generateToken(user.id, newEmail); // Pass both the id and the newEmail

     res.status(200).json({ success: true, token, user: newUser });
  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});





export default router;
