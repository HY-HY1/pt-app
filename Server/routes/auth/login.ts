import { Router, Request, Response, NextFunction } from 'express';
import UserModel from '@models/userModel';
import hashCompare from '@utils/hashing/hashCompare';
import { generateToken } from '@utils/jwt/generateToken';
import { requestLogger } from '@middleware/index';

const router = Router();

router.post('/', requestLogger,async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ error: "Email and Password are required" });
      return; 
    }

    const existingUser = await UserModel.findOne({ email: email });

    if (!existingUser) {
      res.status(401).json({ error: 'User not found' });
      return; // Prevents the rest of the code from running
    }

    await hashCompare({ existingString: existingUser.password, input: password });

    const token = generateToken(email)


    res.status(200).json({ success: true, token: token,  });
  } catch (error) {
    next(error);
  }
});

export default router;
