import { useEffect, useState } from "react"
import Login from "../components/Login"
import Register from "../components/Register"
import useLoading from "../hooks/useLoading"

function FrontPage() {
   const [active, setActive] = useState(false)
   const { vanishLoader } = useLoading()

   function toggleActive(){
      setActive(a => !a)
   }

   useEffect(() => {
      
      const vanish = async () => {
         await new Promise((resolve) => setTimeout(()=>{
            vanishLoader()
            return resolve;
         }, 4000))
      }

      vanish()
   }, [])

   return (
    <>
      <div className="bg-container" id="bg-container">
      </div>
      <div className="front-container">
         <div className={`front-inner-container ${active? 'active': ''}`}>
            <Login/>
            <Register/>
            <div className="toggle-box">
               <div className="toggle-panel toggle-left">
                  <img src="https://olive-odella-90.tiiny.site/HIVnext.svg" alt="HIVnext" />
                  <small>Health Information Vault for Differentiated HIV Services</small>
                  <h1>Hello, welcome!</h1>
                  <p>Don't have an account?</p>
                  <button className="btn register-btn" onClick={()=>toggleActive()}>Register</button>
               </div>
               <div className="toggle-panel toggle-right">
                  <img src="https://olive-odella-90.tiiny.site/HIVnext.svg" alt="HIVnext" />
                  <small>Health Information Vault for Differentiated HIV Services</small>
                  <p>Already have an account?</p>
                  <button className="btn login-btn" onClick={()=>toggleActive()}>Login</button>
               </div>
            </div>
         </div>
         

      </div>
    </>
  )   
}

export default FrontPage
