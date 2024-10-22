import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: 'user' | 'admin';
  subscription: {
    status: 'active' | 'inactive' | 'pending' | 'cancelled';
    plan: 'basic' | 'premium' | 'enterprise';
    renewalDate: Date;
  };
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  preferences: {
    newsletterOptIn: boolean;
  };
  paymentMethods: {
    cardType: string;
    last4Digits: string;
    expiryDate: Date;
    billingAddress: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  }[];
  demographics: {
    gender: 'male' | 'female' | 'non-binary' | 'other';
    dateOfBirth: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Create the schema
const userSchema: Schema = new Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  
  // Subscription details
  subscription: {
    status: { type: String, enum: ['active', 'inactive', 'pending', 'cancelled'], default: 'inactive' },
    plan: { type: String, enum: ['basic', 'premium', 'enterprise'], default: 'basic' },
    renewalDate: { type: Date, default: null },
  },

  // Address details
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },

  phone: { type: String, required: true },

  preferences: {
    newsletterOptIn: { type: Boolean, default: false },
  },

  paymentMethods: [
    {
      cardType: { type: String, required: true },
      last4Digits: { type: String, required: true },
      expiryDate: { type: Date, required: true },
      billingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
      },
    },
  ],

  demographics: {
    gender: { type: String, enum: ['male', 'female', 'non-binary', 'other'], required: true },
    dateOfBirth: { type: Date, required: true },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const UserModel = mongoose.model<User>('User', userSchema);
export default UserModel;
