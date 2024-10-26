import stripe from "@config/Stripe"; // Adjust path if needed
import isExistingUser from "@utils/mongoose/isExistingUser";

interface Token {
  user: {
    id: string;
    email: string;
  };
}

// Get an existing Stripe customer ID if available
const getCustomer = async (user: Token): Promise<string | null> => {
  const userId = user.user.id;

  // Fetch the existing user document from the database
  const existingUser = await isExistingUser(userId);
  if (!existingUser) {
    throw new Error("User not found");
  }

  // If the user already has a Stripe customer ID in the database, return it
  if (existingUser.stripeCustomerId) {
    return existingUser.stripeCustomerId;
  }

  // Otherwise, check if the customer exists in Stripe by email
  const { data: existingStripeCustomers } = await stripe.customers.list({
    email: user.user.email,
    limit: 1,
  });

  // If found in Stripe, save the Stripe ID to the user document
  if (existingStripeCustomers.length > 0) {
    existingUser.stripeCustomerId = existingStripeCustomers[0].id;
    await existingUser.save();
    console.log("Retrieved existing Stripe customer without creating a new one");
    return existingStripeCustomers[0].id;
  }

  return null; // If no existing customer found
};

export default getCustomer;
