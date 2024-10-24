const axios = require('axios');

// Initialize variables for token and verification code
let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWE1MWEwZThhMGIzYzIyOThjY2NmNSIsImVtYWlsIjoiaGp5ZW1tQGljbG91ZC5jb20iLCJpYXQiOjE3Mjk3NzgwODUsImV4cCI6MTczMDM4Mjg4NX0.gpUZimcbGm8BvrU_GNjM8Pk-gmGl69wggsspmUmoKVM';
let VerificationCode = 0;
let EmailCode = 0;
let PasswordCode = 0;

const handleResponse = (response) => {
    if (response.status >= 400) {
        console.log(`Test Failed ❌ With Code  ${response.status}`);
    } else {
        console.log('Test Passed ✅');
        if (response.data.token) {
            token = `Bearer ${response.data.token}`;  // Update the token if a new one is returned
            console.log(`Updated Token: ${token}`);
        }
    }
};

const VerificationTests = async () => {
    const CreateEmailVerify = async (actionType) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/auth/account/verify/create',
                { actionType }, // Send the actionType as part of the request body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            );

            // Save the verification codes
            if (actionType === 'emailChange') {
                EmailCode = response.data.code;
            } else if (actionType === 'passwordChange') {
                PasswordCode = response.data.code;
            } else if (actionType === 'verify') {
                VerificationCode = response.data.code;
            }

            handleResponse(response); // Handle response after the axios request
        } catch (error) {
            console.error(`Error for ${actionType}:`, error.response ? error.response.data : error.message);
        }
    };

    const verifyEmail = async (actionType, code) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/auth/account/verify',
                { actionType, verificationCode: String(code) }, // Send the actionType as part of the request body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            );
            handleResponse(response); // Handle response after the axios request
        } catch (error) {
            console.error(`Error for verification ${actionType}:`, error.response ? error.response.data : error.message);
        }
    };

    const changeEmail = async (newEmail, code) => {
        try {
            console.log("New Token", token);
            const response = await axios.post(
                'http://localhost:4000/auth/account/change-email/',
                { newEmail: newEmail, verificationCode: String(code) }, // Send the actionType as part of the request body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            );
            handleResponse(response); // Handle response after the axios request
        } catch (error) {
            console.error(`Error for changed email:`, error.response ? error.response.data : error.message);
        }
    };

    const changePassword = async (newPassword, code) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/auth/account/change-password',
                { newPassword: newPassword, verificationCode: String(code) }, // Send the actionType as part of the request body
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token
                    }
                }
            );
            handleResponse(response); // Handle response after the axios request
        } catch (error) {
            console.error(`Error for changed password:`, error.response ? error.response.data : error.message);
        }
    };

    // Test creating verification codes for various action types
    await CreateEmailVerify('verify');
    await verifyEmail('verify', VerificationCode);

    await CreateEmailVerify('emailChange');
    await verifyEmail('emailChange', EmailCode);

    await CreateEmailVerify('passwordChange');
    await verifyEmail('passwordChange', PasswordCode);

    await changeEmail('newEmail@gmail.com', EmailCode);
    await changePassword('newPassword123', PasswordCode);
};

// Execute the tests
VerificationTests();
