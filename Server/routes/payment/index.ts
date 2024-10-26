import express, { Router } from 'express';
import createPaymentRouter from '@routes/payment/paymentIntent'

const paymentRouter = Router();
paymentRouter.use(express.json())


// Prefix the routes to avoid conflicts
paymentRouter.use('/create', createPaymentRouter)

export default paymentRouter;
