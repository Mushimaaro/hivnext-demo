import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import type { UserProfileToken } from "../models/UserModel";
import useAuth from "./useAuth";

const useIsAuth = () => {
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();
   const {setAuth, setIsLogin} = useAuth();

   const isAuth = async () => {
      try {  
         const response = await axiosPrivate.get<UserProfileToken>("auth/is-auth")
         if(response){
            setAuth(response?.data!);
            setIsLogin(response?.data.userInfo.isLoggedIn)
            return response.data.accessToken;
         }
      } catch (error) {
            navigate("/")
      }
   }

   return isAuth
}

export default useIsAuth;