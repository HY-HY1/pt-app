import { Router } from 'express';
import authRouter from './auth';  // Import the combined auth routes

const router = Router();

// All auth-related routes will be prefixed with /auth
router.use('/auth', authRouter);

export default router;
