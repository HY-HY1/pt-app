import express, { Router, Request, Response, NextFunction } from 'express';
import PaymentModel from '@models/paymentModel';
import stripe from '@config/Stripe';
import { authenticateUser } from '@middleware/index';
import createCustomer from '@services/stripe/createCustomer';
import isExistingUser from '@utils/mongoose/isExistingUser';
import exp from 'constants';

const router = Router();

router.use(express.json())

router.post('/', authenticateUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { trainerId, amount } = req.body;
    console.log(req.body)
    const user = (req as any).user;
    const existingUser = await isExistingUser(user.id);

    if (!existingUser) {
      throw new Error('User not found');
    }

    let stripeCustomerId = existingUser.stripeCustomerId;

    if (!stripeCustomerId) {
      console.log('No customer ID found; creating new customer in Stripe.');
      stripeCustomerId = await createCustomer({ user });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp',
      customer: stripeCustomerId,
      metadata: { trainerId, customerId: user.id },
    });

    // Save to the database
    const paymentRecord = new PaymentModel({
      paymentId: paymentIntent.id,
      stripeCustomerId,
      customerId: user.id,
      trainerId,
      amount: amount / 100, // Store in original currency units (e.g., GBP)
      status: 'pending',
    });

    await paymentRecord.save();

    res.status(201).json({ success: true, paymentIntent, paymentRecord });
  } catch (error) {
    console.error('Error processing payment:', error);
    next(error);
  }
});

export default router;
