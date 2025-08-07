import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import useRole from "../hooks/useRole";
import { normalAxios } from "../api/axiosAPI";
import { useEffect } from "react";
import { handleError } from "../lib/ErrorHandler";


const RequireAuth = () => {
   const { setRole, role } = useRole();
   const { auth } = useAuth();
   const location = useLocation();

   const setUserRole = async () => {
      try {
         const response = await normalAxios.post('/auth/login', {roleId: auth?.userInfo.role}, {
         headers: { 'Content-type': 'application/json' },
         withCredentials: true
         })
         const roleName = response.data.roleName;
         const permission = response.data.permission;
         setRole({roleName: roleName, permission: permission})
      } catch (error) {
         handleError(error)
      }
   }

   useEffect(() => {
      setUserRole()
      console.log(role)
   }, [auth])

   return (
      auth?.userInfo.verified ? <Outlet/> : <Navigate to="/" state={{from: location}} replace/>
   )
} 

export default RequireAuth;