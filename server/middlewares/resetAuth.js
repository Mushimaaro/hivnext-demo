import User from "../models/usersModel.js";
import jwt from "jsonwebtoken";

const resetAuth = async (req, res, next) => {
   const {linkid} = req.query;
   const cookies = req.cookies;

   if(cookies?.jwt) return res.status(401).json({success:false, message:"Token found."})

   if(!linkid){
      return res.status(401).json({success:false, message:"No link ID."})
   }

   try {
      const user = await User.findOne({resetLink:linkid}).select("+resetLinkExpireAt");

      if(!user){
         return res.status(401).json({success:false, message:"User not found."})
      }

      if(user.resetLinkExpireAt < Date.now()){
         return res.status(401).json({success:false, message:"Link has expired."})
      }

      req.user = {userId: user._id};

      next();

   } catch (error) {
      return res.status(400).json({success:false, message:error.message})
   }
}

export default resetAuth;