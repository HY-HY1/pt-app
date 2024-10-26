import express, { Router } from 'express'
import onboardingRouter from '@routes/trainer/onboarding/index'

const trainerRouter = Router()

trainerRouter.use(express.json())

trainerRouter.use('/onboarding', onboardingRouter )

export default trainerRouter