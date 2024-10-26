import mongoose, { Schema, Document } from "mongoose";

interface TrainerOnboarding extends Document {
  userId: mongoose.Types.ObjectId; // Link to the user ID
  experience: {
    years: number;
    relevantExperience: string;
    clientTypes: string[]; // Types of clients they've worked with
  };
  availability: {
    daysAvailable: string[]; // Days of the week
    timeSlots: string[]; // Available time slots
  };
  location: {
    city: string;
    state: string;
    postalCode: string;
  };
  rates: {
    singleSessionRate: number;
    packageRates?: Record<string, number>; // Optional packages
  };
  gyms: {
    name: string,
    postcode: string
  };
  services: {
    serviceTypes: string[]; // e.g., personal training, virtual sessions
    specializations: string[]; // e.g., weight loss, strength training
  };
  applicationStatus: "pending" | "approved" | "rejected";
  submittedAt: Date;
}

const OnboardingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  experience: {
    years: { type: Number, required: true },
    relevantExperience: { type: String },
    clientTypes: [String],
  },
  availability: {
    daysAvailable: [String],
    timeSlots: [String],
  },
  location: {
    city: String,
    state: String,
    postalCode: String,
  },
  gyms: {
    name: { type: String, required: true},
    postcode: { type: String, required: true}
  },
  rates: {
    singleSessionRate: { type: Number, required: true },
    packageRates: { type: Map, of: Number },
  },
  services: {
    serviceTypes: [String],
    specializations: [String],
  },
  applicationStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.model<TrainerOnboarding>("TrainerOnboarding", OnboardingSchema);
