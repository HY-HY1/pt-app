import stripe from '@config/Stripe'; // Adjust path if needed
import UserModel from '@models/userModel'; // Adjust path to your User model if necessary
import isExistingUser from '@utils/mongoose/isExistingUser';

interface Token {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

const createCustomer = async (user:any): Promise<string> => {
  try {
    // Fetch the existing user document from the database
    console.log(user.id)
    const existingUser = await isExistingUser(user.id);
    
    console.log('User', user)

    if (!existingUser) {
      throw new Error('User not found');
    }

    // If the user already has a Stripe customer ID, return it
    if (existingUser.stripeCustomerId) {
      return existingUser.stripeCustomerId;
    }

    // Create a new customer on Stripe
    const customer = await stripe.customers.create({
        email: existingUser.email,
        name: existingUser.name.firstName + ' ' + existingUser.name.lastName
        
    });

    existingUser.stripeCustomerId = customer.id;
    await existingUser.save();

    return customer.id;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    throw error;
  }
};

export default createCustomer;
