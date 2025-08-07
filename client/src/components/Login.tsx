import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios, { AxiosError } from "axios";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRole from "../hooks/useRole";
import "../styles/loader.css";
import useLoading from "../hooks/useLoading";

function Login() {
   const axiosPrivate = useAxiosPrivate();
   const {setAuth} = useAuth();
   const {setRole} = useRole();
   const { vanishLoader, appearLoader } = useLoading()
   
   const navigate = useNavigate();
   const navigation = useNavigation();
   const location = useLocation();

   const userRef = useRef<HTMLInputElement|null>(null);
   const errorRef = useRef<HTMLParagraphElement|null>(null);
   
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [errMessage, setErrMessage] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(false)

   useEffect(() => {
      userRef.current?.focus()
   }, [])

   useEffect(() => {
      setErrMessage('');
   }, [email, password])

   async function handleLogin(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      setIsLoading(true)
      try {
         const response = await axiosPrivate.post('/auth/login', {email:email, password:password})
         
         if(response.data){
            setAuth(response.data)

            const res = await axiosPrivate.post('/role/get', {roleId: response.data.userInfo.role})
            if(res){
               setRole({roleName: res.data.roleName, permission: res.data.permission})
            }
         }
         setEmail('');
         setPassword('');

         handleNavigate('/index');

      } catch (error) {
         if(axios.isAxiosError(error)){
            const e: AxiosError = error
            if(e.response){
               setErrMessage(error.message)
            }
         }else {
            setErrMessage("An unexpected error occurred.")
         }
         errorRef.current?.focus();
      } finally {
         setIsLoading (false)
      }
   }

   const handleNavigate = (loc: string, e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e?.preventDefault()
      const vanish = async () => {
         await new Promise((resolve) => setTimeout(()=>{
               vanishLoader()
            return resolve;
         }, 4000))
      }

      const waitNavigate = async () => {
         await new Promise((resolve) => setTimeout(()=>{
               navigate(loc, { state:{ from: location.pathname}, replace: true})
            return resolve;
         }, 1000))
      }

      appearLoader()
      waitNavigate()
      if(navigation.state === "idle")
         vanish()
   }

  return (
   <>
      <div className="form-box login">
         <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="input-box">
               <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" ref={userRef} autoComplete="off" value={email} required/>
               <MdEmail/>
            </div>
            <div className="input-box">
               <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" value={password} required/>
               <FaLock/>
            </div>
            <div className="forgot-link">
               <Link to="/reset-password" onClick={e => handleNavigate("/reset-password",e)}>Forgot password?</Link>
            </div>
            <button type="submit" className="btn">Login</button>
            <div>
               <p ref={errorRef} aria-live="assertive" style={{color: "black"}}>{errMessage}</p>
               <div>{isLoading?<div className="lds-ellipsis"><div ></div><div ></div><div ></div><div ></div></div>:<div style={{width: '80px', height:'80px'}}></div>}</div>
            </div>
         </form>
      </div>
   </>
  )
}

export default Login