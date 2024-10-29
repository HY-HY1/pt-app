interface User {
  user: {
    name: {
      firstName: string;
      lastName: string;
    };
    email: string;
    password: string;
    role: "user" | "admin";
    emailVerified: Boolean;
    phoneVerified: Boolean;
    subscription?: {
      status: "active" | "inactive" | "pending" | "cancelled";
      plan: "basic" | "premium" | "enterprise";
      renewalDate?: Date;
    };
    address?: {
      street?: string;
      city?: string;
      state?: string;
      postalCode?: string;
      country?: string;
    };
    phone?: string;
    preferences?: {
      newsletterOptIn?: boolean;
    };
    paymentMethods?: {
      cardType?: string;
      last4Digits?: string;
      expiryDate?: Date;
      billingAddress?: {
        street?: string;
        city?: string;
        state?: string;
        postalCode?: string;
        country?: string;
      };
    }[];
    stripeCustomerId?: string;
    demographics?: {
      gender?: "male" | "female" | "non-binary" | "other";
      dateOfBirth?: Date;
    };
    createdAt?: Date;
    updatedAt?: Date;
  };
}

interface UserResponse extends User {
    authenticated: boolean,
    success: boolean
}
