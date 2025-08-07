import User from "../models/usersModel.js";
import Role from "../models/rolesModel.js";
import mongoose from "mongoose";

export const getPaginatedData = async (Schema, page = 1, limit = 20, filter = '{}', sort = '{"hivnextid":1}', checkrole = false, rolesarray = []) => {
   const variable = {hivnextid: {$gt:0}}
   const var2 = JSON.parse('{"hivnextid": {"$gt":0}}');
   const roles = rolesarray.map(id => new mongoose.Types.ObjectId(id))
   let rolesfilter = {}
   
   if(checkrole === true){
      if(rolesarray.length !== 0){
         rolesfilter = {...rolesfilter, 
            ...{role: {$in: roles}}
         }
      }else{
         rolesfilter = {...rolesfilter, 
            ...{role: null}
         }
      }
   }

   let result = await Schema.aggregate([
      {
         $match: var2
      },
      {
         $match: JSON.parse(filter)
      },
      {
         $match: rolesfilter
      }
   ]).sort(JSON.parse(sort)).facet({
            metaData: [
               {
                  $count: 'totalDocuments'
               },
               {
                  $addFields: {
                     pageNumber: page,
                     totalPages: {$ceil:{$divide: ["$totalDocuments", limit]}}
                  }
               }
            ],
            data: [
               {
                  $skip: (page-1)*limit
               },
               {
                  $limit: limit
               }
            ]
         });

   return result;
}

export const getRoleData = async (filter = '{}') => {
   let result = await Role.aggregate([
      {
         $match: {
            role: { $nin: ["admin"]}
         }
      },
      {
         $match: JSON.parse(filter)
      }
   ])

   return result;
}