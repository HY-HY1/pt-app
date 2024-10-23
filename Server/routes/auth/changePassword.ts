import { Router, Request, Response, NextFunction } from "express";
import UserModel from "@models/userModel";
import isExistingUser from "@utils/mongoose/isExistingUser";
import { generateToken } from "@utils/jwt/generateToken";
import VerifyEmailModel from "@models/emailVerifyModel";
import hashString from "@utils/hashing/hashString";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user; // The authenticated user
    const { newPassword, verificationCode } = req.body;

    if (!newPassword) {
      res.status(400).json({ error: "New password is required" });
      return;
    }

    if (!verificationCode) {
      res.status(400).json({ error: "Verification code is required" });
      return;
    }

    const passwordCode = await VerifyEmailModel.findOne({ email: user.email, actionType: "passwordChange" });

    if (!passwordCode) {
      res.status(400).json({ error: "You need to verify your password" });
      return;
    }

    console.log(passwordCode.code)

    if (passwordCode.code !== verificationCode) {
      res.status(400).json({ error: "Verification code is incorrect" });
      return;
    }

    const passwordHash = await hashString(newPassword)

    await UserModel.findByIdAndUpdate(
        user.id,
        {password: passwordHash},
        {new: true}
    )

    const newUser = await UserModel.findById(user.id);

    res.status(200).json({ success: true, user: newUser });

  } catch (error) {
    next(error); // Pass any errors to the error handler
  }
});

export default router;
