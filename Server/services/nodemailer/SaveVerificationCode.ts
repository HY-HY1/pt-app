import VerifyEmailModel from '@models/emailVerifyModel'; // Assuming correct import of the model

export const SaveVerificationCode = async (
  email: string,
  code: string,
  actionType: 'emailChange' | 'passwordChange' | 'other'
) => {
  try {
    // Check if a verification code for this actionType already exists for this email
    const existingCode = await VerifyEmailModel.findOne({
      email: email,
      actionType: actionType,
    });

    if (!existingCode) {
      // If no existing verification code, create a new one
      const VerifyEmailModelObject = new VerifyEmailModel({
        email: email,
        code: code,
        actionType: actionType,
      });
      await VerifyEmailModelObject.save();
      return {
        success: true,
        message: 'Verification code created',
        code: code,
      };
    }

    // If the verification code already exists, update it
    await VerifyEmailModel.findOneAndUpdate(
      { email: email, actionType: actionType },
      { code: code },
      { new: true }
    );

    return {
      success: true,
      message: 'Verification code updated',
      code: code,
    };
  } catch (error) {
    console.error('Error saving or updating verification code:', error);
    throw new Error('Failed to save verification code');
  }
};
