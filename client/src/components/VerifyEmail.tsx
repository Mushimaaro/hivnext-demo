import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { axiosPrivate } from "../api/axiosAPI";
import "../styles/loader.css";
import "../styles/otp.css";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import useLoading from "../hooks/useLoading";

function VerifyEmail() {

   const { vanishLoader, appearLoader } = useLoading()

   const inputRef = useRef<(HTMLInputElement|null)[]>([]);
   const errRef = useRef<HTMLDivElement|null>(null);
   const sentRef = useRef<HTMLDivElement|null>(null);

   const navigate = useNavigate();
   const location = useLocation();
   const navigation = useNavigation();
   
   const [otp, setOtp] = useState(new Array(6).fill(""));
   const [errMessage, setErrMessage] = useState<string>('');
   const [sentMessage, setSentMessage] = useState<string>('');
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isSent, setIsSent] = useState<boolean>(false)
   const [isError, setIsError] = useState<boolean>(false)
   const [timerText, setTimerText] = useState('5:00');
   const [timerReady, setTimerReady] = useState(true);

   useEffect(() => {
      if(inputRef){
         if(inputRef.current[0]){
            inputRef.current[0].focus();
         }
      }
      
   }, [])

   useEffect(() => {
      sentRef.current?.focus();
   }, [])

   useEffect(() => {
   }, [timerText, timerReady])

   useEffect(() => {
      setErrMessage('');
   }, [otp])

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

   async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()

      const joinedotp = otp.join("");
      if(joinedotp.length === 6){
         setIsLoading(true)
         setIsSent(false)
         setIsError(false)
         console.log(joinedotp)
         try {
            const res = await axiosPrivate.post('/auth/verify-email', {providedOtp: joinedotp})
            //setEmail('');
            if(!res.data.success){
               setIsError(true)
               setErrMessage(res.data.message)
            }
            else{
               setIsSent(true)
               setSentMessage("Your email has successfully been verified!")
               sentRef.current?.focus();
            }
            
         } catch (error: any) {
            setIsError(true)
            if(axios.isAxiosError(error)){
               const e: AxiosError = error
               if(e.response){
                  setErrMessage(error.message)
               }
            }else {
               setErrMessage(error.message)
            }
            errRef.current?.focus();
         } finally {
            setIsLoading (false)
            setIsSent(true)
            setSentMessage("Your email has successfully been verified!")
            await new Promise((resolve) => setTimeout(()=>{
               handleNavigate('/index')
               return resolve
            },3000))
         }
      }
   } 

   const buttonClicked = () => {
      const joinedotp = otp.join("");
      const button = document.querySelector(".btn.otp")
      if(joinedotp.length !== 6){
         button?.classList.add("denied")

         button?.addEventListener('animationend', () => {
            button.classList.remove('denied');
         }, {once: true})
      }
   } 

   const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if(isNaN(+value) && value===" ") return

      const newOtp = [...otp];
      // allow only one input
      newOtp[index] = value.substring(value.length - 1);
      setOtp(newOtp)

      if(value && index < 5 && inputRef.current[index+1]){
         inputRef.current[index+1]?.focus()
      }

      //const combinedOtp = newOtp.join("")
   }

   const handleClick = (index: number) => {
      inputRef.current[index]?.setSelectionRange(1,1)

      if (index > 0 && !otp[index-1]){
         inputRef.current[otp.indexOf("")]?.focus()
      }
   }

   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.key === "Backspace" && !otp[index] && index>0 && inputRef.current[index-1]){
         inputRef.current[index-1]?.focus()
      }
   }

   const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      
      const value = e.clipboardData.getData('text/plain')
      if(isNaN(+value)) return

      const newOtp = [...otp];
      let newvalue = value
      if(newvalue.length >= 6){
         newvalue = newvalue.slice(0,6)
      }

      for (let i = 0, j = 0, k = index; i < (6-index); i++, j++, k++) {
         inputRef.current[k]?.focus();
         inputRef.current[k]!.value = newvalue[j]
         newOtp[k] = newvalue[j];
         setOtp(newOtp)
      }
      e.preventDefault()
   }

   const resendOTP = () => {
      let count = 5*60;
      setTimerText('5:00')
      setTimerReady(false)
      const invervalSec = setInterval(() => {
         count--;
         if(count < 0){
            setTimerReady(true)
            clearInterval(invervalSec)
         } else{
            const minutes = Math.floor(count / 60)
            const seconds = count % 60
            let countText = "";
            if(seconds < 10)
               countText = `${minutes}:0${seconds}`
            else
               countText = `${minutes}:${seconds}`
            setTimerText(countText);
         }
      }, 1000)

      
   }

   return (
   <>
      <div className="form-box otp">
         <form onSubmit={handleSubmit}>
            <h1>Verify email</h1>
            <div className="input-box otp">
               {otp.map((value, index) => {
                     return <input key={index} type="text" value={value}
                        ref={input => {if(input) inputRef.current[index] = input}}
                        onChange={(e)=>handleChange(index,e)}
                        onClick ={() => handleClick(index)}
                        onKeyDown={(e) => handleKeyDown(index,e)}
                        onPaste={(e) => handlePaste(index,e)}
                        autoComplete="off"
                     />
                  })
               }
            </div>
            <button type="submit" onClick={buttonClicked} className="btn otp">Submit</button>
            <div style={{width: '100%', height:'20px', marginTop:"20px"}}>
               <span>Didn't receive OTP?</span><br/>
               {
                  timerReady
                  ? <a onClick={resendOTP} style={{color:'blue', cursor:"pointer"}}>Resend OTP</a>
                  : <span>Resend in: {timerText}</span>
               }
            </div>
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

export default VerifyEmail