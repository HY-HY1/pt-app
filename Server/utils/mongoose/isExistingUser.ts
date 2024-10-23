import mongoose from 'mongoose';  // Import mongoose for ObjectId type
import UserModel from '@models/userModel';

export default async function isExistingUser(_id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error('Invalid user ID');
    }

    const existingUser = await UserModel.findById(_id);  // Use findById for cleaner syntax

    if (!existingUser) {
      throw new Error('User not found');
    }

    return existingUser;
  } catch (error) {
    console.error(error);
    return null;  // Return null explicitly if there's an error
  }
}
