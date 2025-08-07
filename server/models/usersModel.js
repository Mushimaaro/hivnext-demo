import mongoose from "mongoose";

const userSchema = mongoose.Schema({
   hivnextid: {
      type: Number,
      required: true
   },
   email: {
      type: String,
      required: [true, "Please input email."],
      trim: true,
      unique: true,
      minLength: [5, "Email must have at least 5 characters long."]
   },
   username: {
      type: String,
      required: [true, "Please input username."],
      maxLength: [30, "Username cannot exceed 30 characters long."]
   },
   password: {
      type: String,
      required: [true, "Please input password."],
      trim: true,
      select: false
   },
   myvasid: {
      type: String,
      default:'none',
      required: false,
      trim: true,
   },
   role : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role'
   },
   verified: {
      type: Boolean,
      default: false
   },
   verifyOtp: {
      type: String,
      select: false,
   },
   verifyOtpExpireAt: {
      type: Number,
      select: false,
   },
   resetLinkExpireAt: {
      type: Number,
      select: false,
   },
   resetLink: {
      type: String
   },
   isLoggedIn: {
      type: Boolean,
      default: false
   }
},{
   timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;