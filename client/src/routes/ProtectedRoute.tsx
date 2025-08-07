import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useRole from '../hooks/useRole'
import UnauthorizedPage from '../pages/UnauthorizedPage'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import type { AccessTokenProfile, UserInfoProfile, UserProfileToken } from '../models/UserModel'
import { useEffect, useRef, useState} from 'react'
import useIsAuth from '../hooks/useIsAuth'
import { axiosPrivate } from '../api/axiosAPI'
import type { RoleProfile } from '../models/RoleModel'
import useLoading from '../hooks/useLoading'

type Props = {
   children: React.ReactNode;
   allowedRoles: Array<string>;
}

const ProtectedRoute = ({children, allowedRoles}: Props) => {
   const location = useLocation();
   const navigate = useNavigate();
   const [returnType, setReturnType] = useState(0);
   const {auth, setAuth, isLogin, setIsLogin} = useAuth();
   const {role, setRole} = useRole();
   const isAuth = useIsAuth();
   const ranEffect = useRef(false);
   const {setIsLoad} = useLoading()
   const [isLoading, setIsLoading] = useState(true)

   const hasRequiredRole = () => {
      if(allowedRoles.find(str => str === role?.roleName))
         return true
      else
         return false
   } 
 
   useEffect(() => {
      setIsLoad(false)
      if(ranEffect.current === true){
         const checkIsLoggedIn = async () => {
            try {
               const res = await isAuth();

               if(isLoading){
                  if(res){
                     const accessToken = jwtDecode<JwtPayload>(res) as AccessTokenProfile;
                     if(accessToken.userInfo.isLoggedIn){
                        setIsLogin(true)
                     }
                     const info = accessToken.userInfo as UserInfoProfile;
                     const newObj = {...auth, userInfo: {...info}} as UserProfileToken
                     setAuth(newObj)

                     const ress = await axiosPrivate.post('role/get/', { roleId: accessToken.userInfo.role});
                     const roleObj = {roleName: ress.data.roleName, permission: ress.data.permission} as RoleProfile
                     setRole(roleObj);
                  }else{
                     setIsLogin(false)
                  }
                  console.log("Done check authentication.")
               }
               
            } catch (error) {
               console.error(error)
            } finally {
               setIsLoading(false)
               if(!isLoading){
                  if(location.pathname === "/"){
                     if(auth?.userInfo?.verified && isLogin){
                        console.log("Redirect to home page")
                        setReturnType(1)
                        navigate('/index', { state:{ from: location.pathname}, replace: true})
                     }else if(!auth?.userInfo?.verified && isLogin){
                        console.log("Redirect to verify email page")
                        setReturnType(1)
                        navigate('/verify-email', { state:{ from: location.pathname}, replace: true})
                     }else{
                        console.log("No redirect")
                        setReturnType(1)
                     }
                  } else if(location.pathname.includes('/index')){
                     if(!auth?.userInfo?.verified && !isLogin){
                        console.log("redirect to login page")
                        setReturnType(1)
                        navigate('/', { state:{ from: location.pathname}, replace: true})
                     } else if(!auth?.userInfo?.verified && isLogin){
                        console.log("Redirect to verify email page")
                        setReturnType(1)
                        navigate('/verify-email', { state:{ from: location.pathname}, replace: true})
                     }else if(auth?.userInfo?.verified && isLogin && hasRequiredRole()){
                        console.log("No redirect")
                        setReturnType(1)
                     }else {
                        console.log("Load Unauthorized page")
                        setReturnType(2)
                     }
                  }else if(location.pathname.includes('/verify-email')){
                     if(auth?.userInfo?.verified){
                        console.log("Redirect to login page")
                        setReturnType(1)
                        navigate('/', { state:{ from: location.pathname}, replace: true})
                     }else{
                        console.log("No redirect")
                        setReturnType(1)
                     }
                  }else{
                     console.log("Load Unauthorized page")
                     setReturnType(2)
                  }
               }
            }
         }

         checkIsLoggedIn()
         if(!isLoading)
            setIsLoad(true)
      }

      return () => {
         ranEffect.current = true;
      
      }

   },[isLoading, navigate])

   useEffect(()=>{},[returnType])


   /*
   returnType value
   0: empty
   1: children
   2: unauthorized page
   */



   if(returnType === 0 && !isLoading){
      return <></>
   }else if(returnType === 1 && !isLoading){
      return <>{children}</>
   }else if(returnType == 2 && !isLoading){
      return <UnauthorizedPage/>
   }else{
      return <></>
   }
}

export default ProtectedRoute
