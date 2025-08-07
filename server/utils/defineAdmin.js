import User from "../models/usersModel.js";
import Role from "../models/rolesModel.js";
import mongoose from "mongoose";
import { hashPassword } from "./hashing.js";

const createAdmin = async () => {
   const adminRoleID = new mongoose.Types.ObjectId();

   Role.findOne({}).then(async(role, err) =>{
      const adminRole = new Role({
         _id: adminRoleID,
         role: 'admin',
         permission: ['homepage','admindashboard','dailydb','linktocare','activestaff','testnow','users','reports','upload','mainpage','createData','deleteData','updateData','createUser','deleteUser','updateUser','updateUserRole','updateSelfUser']
      });

      const guestRole = new Role({
         _id: new mongoose.Types.ObjectId(),
         role: 'guest',
         permission: ['frontpage']
      });

      const userRole = new Role({
         _id: new mongoose.Types.ObjectId(),
         role: 'user',
         permission: ['homepage','dailydb','linktocare','testnow','reports','mainpage','updateSelfUser','deleteSelfUser']
      });

      if(err){throw err}
      if(!role){
         await adminRole.save();
         await guestRole.save();
         await userRole.save();
      }
   }).catch((err) => {
      console.error("Error creating role:", err)
   })

   const admin = new User({
      hivnextid: 0,
      email: process.env.DEV_EMAIL,
      username: process.env.DEV_USERNAME,
      password: hashPassword(process.env.DEV_PASSWORD),
      myvasid: 'none',
      role: adminRoleID,
      verified: true
   });
   try {
      await admin.save();
      console.log(`New roles and admin created.`);
   } catch (error) {
      console.error("Error creating user:", error)
   }
}

export default createAdmin;