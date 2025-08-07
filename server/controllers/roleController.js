import Role from "../models/rolesModel.js"

export const getRole = async (req, res) => {
   const {roleId} = req.body

   try {
      const role = await Role.findById(roleId);
      
      if(!role){
         return res.status(401).json({success: false, message: "Role not found."})
      }

      return res.status(200).json({success: true, roleName: role.role, permission: role.permission, message: `Found ${role.role} role`})
      
   } catch (error) {
      return res.status(400).json({success: false, message: error.message})
   }
}

export const getAllRoles = async (req, res) => {
   try {
      const response = await Role.find({})

      if(!response){
         return res.status(401).json({success: false, message: "Role(s) not found."})
      }

      const outputRoles = response.map(item => ({
         roleId: String(item._id),
         role: item.role,
         permission: item.permission,
         createdAt: item.createdAt
      }))

      return res.status(200).json({
         success: true,
         rolesData: outputRoles
      })

   } catch (error) {
      return res.status(400).json({success: false, message: error.message})
   }
}

export const updateRole = async (req, res) => {

}

export const deleteRole = async (req, res) => {

}

export const createRole = async (req, res) => {

}