import { updateUserSchema } from "../middlewares/validator.js";
import Role from "../models/rolesModel.js";
import User from "../models/usersModel.js";
import {getPaginatedData, getRoleData} from "../utils/services.js";

export const getUser = async (req, res) => {
   const {userId} = req.body;

   try {
      const user = await User.findById(userId);

      if(!user){
         return res.status(401).json({success: false, message: 'User not found'});
      }

      const role = await Role.findById(user.role);

      if(!role){
         return res.status(401).json({success: false, message: 'Role not found'});
      }

      return res.status(200).json({
         success: true,
         userData: {
            hivnextid: user.hivnextid,
            email: user.email,
            username: user.username,
            myvasid: user.myvasid,
            role: {
               roleName: role.role,
               permission: role.permission
            }
         }
      })

   } catch (error) {
      return res.status(400).json({success: false, message: error.message});
   }
}

export const getAllUsers = async (req, res) => {
   const {page, limit, filter, sort} = req.query
   let users = undefined;
   let foundRoles = []

   try {
      if(!page && !limit && !filter && !sort){
         users = await getPaginatedData(User);
      }else{
         if(filter.includes("role")){
            
            const roleFilter = await getRoleData(filter)
            roleFilter.map(roleId => {
               foundRoles.push(String(roleId._id))
            })
            users = await getPaginatedData(User,parseInt(page),parseInt(limit),'{}', sort,true,foundRoles);
         }else{
            users = await getPaginatedData(User,parseInt(page),parseInt(limit),filter, sort);
         }
      }

      if(!users){
         return res.status(401).json({success: false, message: 'User not found'});
      }

      const getRoles = await Role.find();
      const metaData = {...users[0].metaData[0], count: users[0].data.length}
      const data = users[0].data;
      const outputData = data.map( item => (
      {
         userId: String(item._id),   
         hivnextid: item.hivnextid,
         email: item.email,
         username: item.username,
         myvasid: item.myvasid,
         role: getRoles.find(user => String(user._id) === String(item.role)).role,
         verified: item.verified,
         createdAt: item.createdAt,
         isLoggedIn: item.isLoggedIn
      }))

      return res.status(200).json({
         success: true,
         metaData: metaData,
         usersData: outputData
      })

   } catch (error) {
      return res.status(400).json({success: false, message: error.message});
   }
}

export const updateUser = async (req, res) => {
   const {userId, email, username, myvasid, role, verified } = req.body;

   const {error, value} = updateUserSchema.validate({email, username})
      
   if(error) {
      return res.status(401).json({ success: false, message: error.details[0].message})
   }

   try {
      const updateUser = await User.findOne({_id:userId})

      if(!updateUser){
         return res.status(401).json({success: false, message: 'User not found'});
      }
      
      const roleId = await Role.findOne({role:role})

      updateUser.email = email;
      updateUser.username = username;
      updateUser.myvasid = myvasid;
      updateUser.role = roleId._id;
      updateUser.verified = verified;

      await updateUser.save();

      return res.status(200).json({
         success: true,
         message: "User successfully updated."
      })

   } catch (error) {
      return res.status(400).json({success: false, message: error.message});
   }
}

export const deleteUser = async (req, res) => {
   const {userId} = req.body;

   if(!userId){
      return res.status(401).json({success: false, message: 'No input id found'});
   }

   try {
      const deleteUser = await User.findByIdAndDelete(userId)

      if(!deleteUser)
         return res.status(401).json({success: false, message: 'User not found'});

      return res.status(200).json({
         success: true,
         message: "User successfully deleted."
      })
   } catch (error) {
      return res.status(400).json({success: false, message: error.message});
   }
}

export const createUser = async (req, res) => {

}
