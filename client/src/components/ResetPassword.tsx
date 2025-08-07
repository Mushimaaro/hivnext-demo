import { MdEmail } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { axiosPrivate } from "../api/axiosAPI";
import "../styles/loader.css";

function ResetPassword() {

   const userRef = useRef<HTMLInputElement|null>(null);
   const errRef = useRef<HTMLDivElement|null>(null);
   const sentRef = useRef<HTMLDivElement|null>(null);
   
   const [email, setEmail] = useState<string>('');
   const [errMessage, setErrMessage] = useState<string>('');
   const [sentMessage, setSentMessage] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isSent, setIsSent] = useState<boolean>(false)
   const [isError, setIsError] = useState<boolean>(false)

   useEffect(() => {
      userRef.current?.focus()
   }, [])

   useEffect(() => {
      sentRef.current?.focus();
   }, [])

   useEffect(() => {
      setErrMessage('');
   }, [email])

   async function handleLogin(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      setIsLoading(true)
      setIsSent(false)
      setIsError(false)
      try {
         const res = await axiosPrivate.post('/auth/send-reset-pass', {email:email})
         setEmail('');
         if(!res.data.success)
            setIsError(true)
         else{
            setIsSent(true)
            setSentMessage("Email sent! Please check your email for confirmation")
            sentRef.current?.focus();
         }
            
      } catch (error) {
         setIsError(true)
         if(axios.isAxiosError(error)){
            const e: AxiosError = error
            if(e.response){
               setErrMessage(error.message)
            }
         }else {
            setErrMessage("An unexpected error occurred.")
         }
         errRef.current?.focus();
      } finally {
         setIsLoading (false)
         setIsSent(true)
         setSentMessage("Email sent! Please check your email for confirmation")
      }
   }

  return (
   <>
      <div className="form-box login">
         <form onSubmit={handleLogin}>
            <h1>Reset password</h1>
            <div className="input-box">
               <input onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="Email" ref={userRef} autoComplete="off" value={email}/>
               <MdEmail/>
            </div>
            <button type="submit" className="btn">Send Reset Link</button>
            <div>
               <div style={{width: '100%', height:'80px', marginTop:"20px"}}>
                  {isLoading
                  ?<div className="lds-ellipsis"><div ></div><div ></div><div ></div><div ></div></div>
                  :isError && !isLoading
                     ?<div ref={errRef} aria-live="assertive" style={{color: "black"}}>{errMessage}</div>
                     :isSent
                        ?<div ref={sentRef} aria-live="assertive" style={{color: "black"}}>{sentMessage}</div>
                        :<></>
                  }
               </div>
            </div>
         </form>
      </div>
   </>
  )
}

export default ResetPassword