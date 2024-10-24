import VerifyEmailModel from '@models/emailVerifyModel'; // Assuming correct import of the model

export const SaveVerificationCode = async (
  email: string,
  code: string,
  actionType: 'emailChange' | 'passwordChange' | 'other'
) => {
  try {
    const existingCode = await VerifyEmailModel.findOne({
      email: email,
      actionType: actionType,
    });

    if (!existingCode) {
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
