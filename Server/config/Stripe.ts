import Stripe from 'stripe';
import { config } from '@config/env'
// Initialize Stripe with the secret key
const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export default stripe;
