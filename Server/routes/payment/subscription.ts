import { Router, Request, Response, NextFunction } from 'express';
import stripe from '@config/Stripe';
import { authenticateUser } from '@middleware/index';
import createCustomer from '@services/stripe/createCustomer';
import getCustomer from '@services/stripe/getCustomer';

const router = Router();

router.post('/create-subscription', authenticateUser, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { trainerId, trainerRate } = req.body; // trainerRate is the dynamic price
    const user = (req as any).user;

    // Step 1: Retrieve or create a Stripe customer for the user
    let customerId = await getCustomer(user);
    if (!customerId) {
      customerId = await createCustomer(user);
    }

    const product = await stripe.products.create({
      name: `Personal Training with ${trainerId}`, // Customize name as needed
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: trainerRate * 100, // Convert to cents
      currency: 'usd',
      recurring: { interval: 'month' },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: price.id }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    const paymentIntent = (subscription.latest_invoice as any)?.payment_intent;

    res.status(201).json({
      success: true,
      subscriptionId: subscription.id,
      clientSecret: paymentIntent?.client_secret,
      status: subscription.status,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    next(error);
  }
});

export default router;
