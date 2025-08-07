import { Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useRefreshRole from "../hooks/useRefreshRole";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";


const PresistLogin = () => {
   const [isLoading, setIsLoading] = useState(true)
   const refresh = useRefreshToken();
   const refreshRole = useRefreshRole();
   const { auth } = useAuth();

   useEffect(() => {
      const verifyRefreshToken = async () => {
         try {
            const accessToken = await refresh();
            if(accessToken){
               refreshRole(accessToken)
            }  
         } catch (error) {
            console.error(error)
         }finally {
            setIsLoading(false)
         }
      }

      !auth?.accessToken 
      ? verifyRefreshToken() 
      : setIsLoading(false);
   },[])

   useEffect(() => {
   },[isLoading])

   return (
      <>
         {isLoading
            ? <p>Loading...</p>
            : <><Outlet/></>
         }
      </>
   )
}

export default PresistLogin;