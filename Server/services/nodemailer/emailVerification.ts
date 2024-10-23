import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Set up the transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // true for 465, false for other ports
  auth: {
    user:  "hjyemm10@gmail.com", // your email account
    pass:  "kfet oebx zihl soyd", // your email password or app-specific password
  },
});

// Send verification code function
export const sendVerificationCode = async (email: string, verificationCode: string) => {
  try {
    const mailOptions = {
      from: `"Your App Name" <${process.env.SMTP_USER || "hjyemm10@gmail.com"}>`, // sender address
      to: email, // recipient address
      subject: 'Email Verification Code', // subject line
      text: `Your verification code is: ${verificationCode}`, // plain text body
      html: `<p>Your verification code is: <b>${verificationCode}</b></p>`, // html body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent: %s', info.messageId);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error };
  }
};
