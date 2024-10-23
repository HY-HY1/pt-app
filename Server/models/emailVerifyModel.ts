import mongoose, { Schema, Document } from 'mongoose';

interface VerifyEmail extends Document {
  email: string;
  code: number;
  actionType: 'emailChange' | 'passwordChange' | 'other';  // Add actionType field
  createdAt?: Date;
}

// Create the schema
const verifyEmailSchema: Schema = new Schema({
  email: { type: String, required: true },
  code: { type: Number, required: true },
  actionType: { type: String, enum: ['emailChange', 'passwordChange', 'verify'], required: true },  // Set action type
  createdAt: { type: Date, default: Date.now }
});

const VerifyEmailModel = mongoose.model<VerifyEmail>('VerifyEmail', verifyEmailSchema);
export default VerifyEmailModel;
