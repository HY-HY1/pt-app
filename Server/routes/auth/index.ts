import express, { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';
import accountRouter from './account';

const authRouter = Router();

// Prefix the routes to avoid conflicts
authRouter.use(express.json())
authRouter.use('/login', loginRouter);
authRouter.use('/register', registerRouter);
authRouter.use('/account', accountRouter);

export default authRouter;
