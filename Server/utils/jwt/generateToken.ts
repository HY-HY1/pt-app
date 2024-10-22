import jwt from 'jsonwebtoken';

export const generateToken = ( email: string): string => { // Add user ID in later
  const payload = { email };  

  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '7d',  
  });

  return token;
};
