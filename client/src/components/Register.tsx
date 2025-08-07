import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../styles/loader.css";
import type { AxiosError } from "axios";
import axios from "axios";
import { CheckEmail, CheckPassword } from "../lib/RegisterCheck";
import useLoading from "../hooks/useLoading";

function Register() {
   const axiosPrivate = useAxiosPrivate();
   const {setAuth} = useAuth();
   const {setRole} = useRole();
   const { vanishLoader, appearLoader } = useLoading()

   const navigate = useNavigate();
   const location = useLocation();
   const navigation = useNavigation();

   const userRef = useRef<HTMLInputElement|null>(null);
   const errRef = useRef<HTMLDivElement|null>(null);
   const sentRef = useRef<HTMLDivElement|null>(null);
   const checkRef = useRef<HTMLDivElement|null>(null);

   const [email, setEmail] = useState<string>('');
   const [username, setUsername] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [sentMessage, setSentMessage] = useState<string>('');
   const [errMessage, setErrMessage] = useState<string>('');
   const [checkMessage, setCheckMessage] = useState<string>('');
   const [isSent, setIsSent] = useState<boolean>(false)
   const [isError, setIsError] = useState<boolean>(false)
   const [isCheck, setIsCheck] = useState<boolean>(false)
   const [isLoading, setIsLoading] = useState<boolean>(false)

   useEffect(() => {
      userRef.current?.focus()
   }, [])

   useEffect(() => {
      sentRef.current?.focus();
   }, [])

   useEffect(() => {
         setErrMessage('');
         setCheckMessage('');
   }, [email, username, password])

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

   async function handleRegister(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      
      if(isCheck){
         
         setIsLoading(true)
         setIsSent(false)
         setIsError(false)
         try {
            const response = await axiosPrivate.post('/auth/register', {email:email, username:username, password:password})
            if(response.data.success){
               setAuth(response.data)
               console.log('test')

               const response2 = await axiosPrivate.post('/role/get', {roleId: response?.data.userInfo.role})
               if(response2.data.success){
                  setRole({roleName: response2.data.roleName, permission: response2.data.permission})

                  await axiosPrivate.post('/auth/send-verify-otp')
               }
               
            }
            setEmail('');
            setUsername('');
            setPassword('');

         } catch (error) {
            setIsError(true)
            if(axios.isAxiosError(error)){
               const e: AxiosError = error
               if(e.response){
                  setErrMessage(error.response?.data.message)
               }
            }else {
               setErrMessage("An unexpected error occurred.")
            }
            errRef.current?.focus();
         } finally {
            setIsLoading (false)
            setIsSent(true)
            setSentMessage("A verify OTP has been sent to your email!")
            await new Promise((resolve) => setTimeout(()=>{
               handleNavigate('verify-email')
               return resolve
            },3000))
         }
      }
   }

   const checkInputField = () => {
      const emailcheck = CheckEmail(email)
      const usercheck = username;
      const pwcheck = CheckPassword(password)
      if(!emailcheck.success){
         setIsCheck(false)
         setCheckMessage(emailcheck.message)
         return
      }
      if(usercheck === ""){
         setIsCheck(false)
         setCheckMessage("Username cannot be empty")
         return
      }
      if(!pwcheck.success){
         setIsCheck(false)
         setCheckMessage(pwcheck.message)
         return
      }
      setIsCheck(true)
      return
   }
   
  return (
   <>
      <div className="form-box register">
         <form onSubmit={handleRegister}>
            <h1>Registration</h1>
            <div className="input-box">
               <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" ref={userRef} autoComplete="off" value={email} required/>
               <MdEmail/>
            </div>
            <div className="input-box">
               <input onChange={(e)=> setUsername(e.target.value)} type="text" placeholder="Username" ref={userRef} autoComplete="off" value={username} required/>
               <FaUser/>
            </div>
            <div className="input-box">
               <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" value={password} required/>
               <FaLock/>
            </div>
            <button type="submit" onClick={checkInputField} className="btn">Register</button>
            <div>
               <div style={{width: '100%', height:'80px', marginTop:"20px"}}>
                  {isLoading
                  ?<div className="lds-ellipsis"><div ></div><div ></div><div ></div><div ></div></div>
                  :isError && !isLoading
                     ?<div ref={errRef} aria-live="assertive" style={{color: "black"}}>{errMessage}</div>
                     :isSent
                        ?<div ref={sentRef} aria-live="assertive" style={{color: "black"}}>{sentMessage}</div>
                        :!isCheck
                           ?<div ref={checkRef} aria-live="assertive" style={{color: "black"}}>{checkMessage}</div>
                           :<></>
                  }
               </div>
            </div>
         </form>
      </div>
   </>
  )
}

export default Register