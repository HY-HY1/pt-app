import { Request, Response ,NextFunction } from "express";
import { generateVerificationCode } from "@utils/math/GenerateVericationCode";
import { sendVerificationCode } from "@services/nodemailer/emailVerification";

export const verifyEmailCode = (req: Request, res:Response, next: NextFunction) => {
    try {   
        const code = generateVerificationCode()
        const user = (req as any).user
        


    } catch (error) {
        next(error)
    }
}