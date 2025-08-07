import express from 'express';
import { loginUser, registerUser, logoutUser, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetPassword, resetPassword, refreshToken, getLoggedInData } from '../controllers/authController.js';
import userAuth from '../middlewares/userAuth.js';
import resetAuth from '../middlewares/resetAuth.js';

const authRouter = express.Router();

// Create new user
authRouter.post('/register', registerUser);
// Login user
authRouter.post('/login', loginUser);
// Logout user
authRouter.post('/logout', logoutUser);
// Send verification OTP
authRouter.post('/send-verify-otp', sendVerifyOtp);
// Verify account
authRouter.post('/verify-email', userAuth, verifyEmail);
// Verify user is authenticated
authRouter.get('/is-auth', userAuth, isAuthenticated);
// Get logged in user data
authRouter.get('/login-data', getLoggedInData);
// Refresh token
authRouter.get('/refresh', refreshToken);
// Request for reset password link
authRouter.post('/send-reset-pass', sendResetPassword);
// Reset new password
authRouter.post('/reset-password', resetAuth, resetPassword);

export default authRouter;