import express, { Router } from 'express';
import { authenticateUser } from '@middleware/index';

const onboardingRouter = Router();

onboardingRouter.use(express.json())
onboardingRouter.use(authenticateUser)

import profileRouter from '@routes/trainer/onboarding/profile'
onboardingRouter.use('/profile', profileRouter)

export default onboardingRouter;
