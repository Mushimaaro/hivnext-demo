import {registerSchema, loginSchema, resetPasswordSchema} from '../middlewares/validator.js';
import Role from '../models/rolesModel.js';
import User from '../models/usersModel.js';
import { hashPassword, compareHashPassword, hmacProcess, genRandomHex } from '../utils/hashing.js';
import jwt from 'jsonwebtoken';
import { welcomeTemplateText, welcomeTemplateHtml, changePasswordTemplateText, changePasswordTemplateHtml } from '../utils/emailTemplate.js';
import modifyTemplate from '../utils/templating.js';
import transporter from '../utils/mailService.js';

export const registerUser = async (req, res) =>  {
   const  {email, username, password} = req.body;
   const {error, value} = registerSchema.validate({email, username, password})
   
   if(error) {
      return res.status(401).json({ success: false, message: error.details[0].message})
   }

   const existingUser = await User.findOne({email: email})

   if(existingUser){
      return res.status(401).json({ success: false, message: "Email already existed."})
   }

   const maxuser = await User.find().sort({hivnextid:-1}).limit(1);
   const hivnextid = maxuser[0].hivnextid + 1;
   const hashedPassword = await hashPassword(password);
   const userRole = await Role.findOne({role: 'user'});

   const newUser = new User({
      hivnextid: hivnextid,
      email: email,
      username: username,
      password: hashedPassword,
      role: userRole._id,
      isLoggedIn: true
   })

   await newUser.save();
   
   const userInfo = {
      userId: newUser._id,
      role: newUser.role,
      verified: newUser.verified,
      isLoggedIn: true
   }

   const token = jwt.sign({
      userInfo: userInfo
   }, process.env.JWT_SECRET, {expiresIn: '1h'});

   const refreshToken = jwt.sign({
      userId: newUser._id
   }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

   res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
      maxAge: 7*24*60*60*1000
   });

   return res.status(201).json({
      success: true,
      message: "User successfully created.",
      accessToken: token,
      userInfo: userInfo
   });
}

export const loginUser = async (req, res) => {
   const  {email, password} = req.body;

   const {error, value} = loginSchema.validate({email, password})

   if(error) {
      return res.status(401).json({ success: false, message: error.details[0].message})
   }

   const existingUser = await User.findOne({email: email}).select('+password')

   if(!existingUser){
      return res.status(401).json({ success: false, message: "Email does not exist."})
   }

   const comparePassword = compareHashPassword(password,existingUser.password);

   if(!comparePassword){
      return res.status(401).json({ success: false, message: "Incorrect email or password."})
   }

   existingUser.isLoggedIn = true;
   existingUser.save();

   const userInfo = {
      userId: existingUser._id,
      role: existingUser.role,
      verified: existingUser.verified,
      isLoggedIn: true
   }

   const token = jwt.sign({
      userInfo: userInfo
   }, process.env.JWT_SECRET, {expiresIn: '1h'});

   const refreshToken = jwt.sign({
      userId: existingUser._id
   }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

   res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict',
      maxAge: 7*24*60*60*1000
   });

   return res.status(201).json({
      success: true,
      message: "User successfully logged in.",
      accessToken: token,
      userInfo: userInfo
   });
}

export const refreshToken = async (req, res) => {
   const cookies = req.cookies

   if(!cookies?.jwt){
      return res.status(401).json({success:false, message:"Unauthorized, please login."})
   }

   const refreshToken = cookies.jwt;

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
      async (err, decoded) => {
         if(err) return res.status(403).json({success:false, message:"Forbidden."});

         const foundUser = await User.findById(decoded.userId);
         
         if(!foundUser) return res.status(401).json({success:false, message:"Unauthorized, please login."})
         
         const userInfo = {
            userId: foundUser._id,
            role: foundUser.role,
            verified: foundUser.verified,
            isLoggedIn: foundUser.isLoggedIn
         }

         const accessToken = jwt.sign({
            userInfo: userInfo
         }, process.env.JWT_SECRET, {expiresIn: '1h'});

         return res.json({accessToken:accessToken, userInfo:userInfo});
      }
   )
}

export const logoutUser = async (req, res) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;
   const token = authHeader.split(' ')[1];
   let userId = '';

   try {
      jwt.verify(token, process.env.JWT_SECRET,
         (err, decoded) => {
            if(err) return res.status(403).json({success:false, message:"Forbidden."});
            userId = decoded.userInfo.userId;
         }
      );

   } catch (error) {
      return res.status(400).json({success:false, message:error.message})
   }

   const cookies = req.cookies;
   if(!cookies?.jwt){
      return res.status(204).json({success:false, message:"No token found."})
   } 

   try {

      if(userId){
         const searchUser = await User.findById(userId);
         searchUser.isLoggedIn = false;
         await searchUser.save();
      }else{
         return res.status(401).json({success:false, message:"User already logged out."});
      }

      res.clearCookie('jwt', { 
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict'
      })

      return res.status(201).json({success: true, message: "User successfully logged out."})

   } catch (error) {
      return res.status(400).json({success: false, message: error.message});
   }

}

export const sendVerifyOtp = async (req, res) => {
   const cookies = req.cookies

   if(!cookies?.jwt){
      return res.status(401).json({success:false, message:"Unauthorized, please login."})
   }

   const refreshToken = cookies.jwt;

   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, 
      async (err, decoded) => {
         if(err) return res.status(403).json({success:false, message:"Forbidden."});

         const foundUser = await User.findById(decoded.userId);
         
         if(!foundUser) return res.status(401).json({success:false, message:"Unauthorized, please login."})
         
         if(foundUser.verified){
            return res.status(401).json({success: false, message: "Account already verified."})
         }

         try { 
            //Send otp email
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const yearNow = new Date().getFullYear();
            const mailOption = {
               from: `"HIVnext" <${process.env.SENDER_EMAIL}>`,
               to: foundUser.email,
               subject: "Your Verify OTP",
               text: modifyTemplate(welcomeTemplateText, {name:foundUser.username, otp:otp, year:yearNow}),
               html: modifyTemplate(welcomeTemplateHtml, {name:foundUser.username, otp:otp, year:yearNow})
            };

            await transporter.sendMail(mailOption);

            const hashCode = hmacProcess(otp, process.env.HMAC_SECRET_KEY)
            foundUser.verifyOtp = hashCode;
            foundUser.verifyOtpExpireAt = Date.now() + 1 * 15 * 60 * 1000;

            await foundUser.save();

            return res.status(200).json({success: true, message: 'Verification OTP sent to email.'})

         } catch (error) {
            return res.status(400).json({success: false, message: error.message});
         }
      }
   )
}

export const verifyEmail = async (req, res) => {
   const {providedOtp} = req.body;
   const {userInfo} = req.user;

   if(!userInfo){
      return res.status(401).json({success: false, message: "User not found, please login"})
   }

   if(!providedOtp){
      return res.status(401).json({success: false, message: 'Please input your OTP code.'});
   }

   try {
      const user = await User.findById(userInfo.userId).select("+verifyOtp +verifyOtpExpireAt");

      if(!user) {
         return res.status(401).json({success: false, message: 'User not found'});
      }


      if(!user.verifyOtp || !user.verifyOtpExpireAt){
         return res.status(401).json({success:false, message: "Something is wrong with the validation code"})
      }

      if(user.verifyOtpExpireAt < Date.now()){
         return res.status(401).json({success:false, message:"Code has been expired."})
      }

      const hashCode = hmacProcess(providedOtp, process.env.HMAC_SECRET_KEY)

      if(hashCode === user.verifyOtp){
         user.verified = true;
         user.verifyOtp = undefined;
         user.verifyOtpExpireAt = undefined;
         await user.save();

         return res.status(200).json({success: true, message: "User successfully verified."})
      }else {
         return res.status(401).json({success:false, message:"Invalid OTP."})
      }
      
   } catch (error) {
      return res.status(400).json({success: false, message: error.message});
   }
}

export const isAuthenticated = async (req, res) => {
   const {userInfo, token} = req.user;

   if(!userInfo) return res.status(401).json({success: false, message: "User not found, please login"})

   if(!token){
      return res.status(401).json({success: false, message: 'Token not found.'});
   }

   try {
      return res.status(200).json({success: true, userInfo: userInfo, accessToken:token})

   } catch (error) {
      return res.status(400).json({success: false, message: error.message});
   }
}

export const getLoggedInData = async (req, res) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;
   
      if(authHeader?.startsWith('Bearer ')){
         const token = authHeader.split(' ')[1];
         try {
            jwt.verify(token, process.env.JWT_SECRET,
               (err, decoded) => {
                  if(err) return res.status(403).json({success:false, message:"Forbidden."});
                  return res.status(200).json({success: true, userInfo: decoded.userInfo, token:token});
               }
            );
         } catch (error) {
            return res.status(400).json({success:false, message:error.message})
         }
      } else {
         const roleId = await Role.findOne({role:"guest"})
         const user = {userId: "", role: roleId._id, verified: false, isLoggedIn: false}
         return res.status(200).json({success: true, userInfo: user});
      }
   
}

export const sendResetPassword = async (req, res) => {
   const {email} = req.body;

   if(!email){
      return res.status(401).json({success: false, message:"Email is required."})
   }

   try {
      const user = await User.findOne({email:email});

      if(!user){
         return res.status(401).json({success: false, message:"User not found."})
      }

      const resetlink = genRandomHex(32);
      const yearNow = new Date().getFullYear();
      const mailOption = {
         from: `"HIVnext" <${process.env.SENDER_EMAIL}>`,
         to: user.email,
         subject: "Reset Password",
         text: modifyTemplate(changePasswordTemplateText, {name:user.username, year:yearNow, resetlink: `http://localhost:5173/reset-password?linkid=${resetlink}`}),
         html: modifyTemplate(changePasswordTemplateHtml, {name:user.username, year:yearNow, resetlink: `http://localhost:5173/reset-password?linkid=${resetlink}`})
      };

      await transporter.sendMail(mailOption);

      user.resetLinkExpireAt = Date.now() + 1 * 15 * 60 * 1000;
      user.resetLink = resetlink;

      await user.save();

      return res.status(200).json({success: true, message: 'Reset Password OTP sent to email.'})

   } catch (error) {
      return res.status(400).json({success: false, message: error.message});
   }
}


export const resetPassword = async (req, res) => {
   const {newpassword} = req.body;
   const {userId} = req.user;
   const {error, value} = resetPasswordSchema.validate({newpassword})

   if(error) {
      return res.status(401).json({ success: false, message: error.details[0].message})
   }

   try {
      const user = await User.findById(userId)

      if(!user){
         return res.status(401).json({success: false, message:"User not found."})
      }

      user.password = hashPassword(newpassword);
      user.resetLink = undefined;
      user.resetLinkExpireAt = undefined;
      await user.save();

      return res.status(200).json({success:true, message:"Successfully change to new password."})

   } catch (error) {
      return res.status(400).json({success:false, message:error.message})
   }
}
