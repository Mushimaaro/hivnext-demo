import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axiosAPI";
import type { UserProfileToken } from "../models/UserModel";
import useAuth from "./useAuth";
import { AxiosError } from "axios";

const useRefreshToken = () => {
   const navigate = useNavigate();
   const {setAuth, setIsLogin} = useAuth();

   const refresh = async () => {
      try {  
         const response = await axiosPrivate.get<UserProfileToken>("auth/refresh")
         if(response){
            setAuth(response?.data!);
            setIsLogin(response?.data.userInfo.isLoggedIn)
            return response.data.accessToken;
         }
      } catch (error) {
         const err = error as AxiosError;
         if(err.response?.status === 401){
            navigate("/")
         }
         else
            console.error(error)
      }
   }
   
   return refresh;
}

export default useRefreshToken;