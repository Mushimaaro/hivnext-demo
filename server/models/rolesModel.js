import mongoose from "mongoose";

const rolesSchema = mongoose.Schema({
   role: {
      type: String,
      default: 'guest'
   },
   permission: {
      type: [String],
      default: ["frontpage"]
   }
},{
   timestamps: true
})

const Role = mongoose.model("Role", rolesSchema);

export default Role;