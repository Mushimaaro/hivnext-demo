import useAxiosPrivate from "./useAxiosPrivate";
import type { UserProfileToken } from "../models/UserModel";
import useAuth from "./useAuth";
import useRole from "./useRole";

const useLogout = () => {
   const {setAuth, setIsLogin} = useAuth();
   const {setRole} = useRole();
   const axiosPrivate = useAxiosPrivate();

   const logout = async () => {
      setIsLogin(false);
      setRole({roleName: 'guest', permission: ['frontpage']})
      setAuth({} as UserProfileToken);

      try {
         await axiosPrivate.post('auth/logout')
      } catch (error) {
         console.error(error)
      }
   } 

   return logout;
}

export default useLogout;