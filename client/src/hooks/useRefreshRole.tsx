import { axiosPrivate } from "../api/axiosAPI";
import type { RoleProfile } from "../models/RoleModel";
import type { AccessTokenProfile } from "../models/UserModel";
import useRole from "./useRole";
import { jwtDecode, type JwtPayload } from "jwt-decode";

const useRefreshRole = () => {
   const {setRole} = useRole();

   const refreshRole = async (accessToken: string) => {
      try {  
         if(accessToken){
            const decoded  = jwtDecode<JwtPayload>(accessToken) as AccessTokenProfile; 
            const response = await axiosPrivate.post<RoleProfile>("role/get", {roleId: decoded?.userInfo.role})
            if(response){
               setRole(response.data);
               return response.data;
         }
         }
      } catch (error) {
         console.log(error)
      }
   }
   
   return refreshRole;
}

export default useRefreshRole;