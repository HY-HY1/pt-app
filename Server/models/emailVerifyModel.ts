import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  _id: String,
  email: String,
  code: Number,
  createdAt: Date,
  updatedAt: Date
  
}

// Create the schema
const userSchema: Schema = new Schema({
    email: {type: String, required: true},
    code: {type: Number},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const VerifyEmailModel = mongoose.model<User>('VerifyEmail', userSchema);
export default VerifyEmailModel;
