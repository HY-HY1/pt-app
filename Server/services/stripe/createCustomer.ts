import stripe from "@config/Stripe"; // Adjust path if needed
import isExistingUser from "@utils/mongoose/isExistingUser";

interface Token {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Create a new Stripe customer and save the ID to the user document
const createCustomer = async (user: Token): Promise<string> => {
  const userId = user.user.id;

  // Fetch the existing user document from the database
  const existingUser = await isExistingUser(userId);
  if (!existingUser) {
    throw new Error("User not found");
  }

  // Create a new Stripe customer
  const customer = await stripe.customers.create({
    email: existingUser.email,
    name: `${existingUser.name.firstName} ${existingUser.name.lastName}`,
  });

  // Save the newly created Stripe customer ID to the user document
  existingUser.stripeCustomerId = customer.id;
  await existingUser.save();
  console.log("New Stripe customer created and saved");

  return customer.id;
};

export default createCustomer;
