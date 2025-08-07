import { useLocation, useNavigate, useNavigation } from "react-router-dom"
import { useEffect } from "react";
import VerifyEmail from "../components/VerifyEmail";
import useLogout from "../hooks/useLogout";
import useLoading from "../hooks/useLoading";


function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = useNavigation();
  const logout = useLogout();
  const { vanishLoader, appearLoader } = useLoading()

  const handleNavigate = (loc: string, e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e?.preventDefault()
    const vanish = async () => {
        await new Promise((resolve) => setTimeout(()=>{
              vanishLoader()
          return resolve;
        }, 4000))
    }

    const waitNavigate = async () => {
        await logout()
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

  useEffect(() => {
    document.title = 'HIVnext - Reset Password';
  }, []);

   return (
    <>
      <div className="bg-container" id="bg-container">
      </div>
      <div className="front-container">
         <div className="front-inner-container">
            <VerifyEmail/>
            <div className="toggle-box">
               <div className="toggle-panel toggle-left">
                  <img src="./src/assets/HIVnext.svg" alt="HIVnext" />
                  <small>Health Information Vault for Differentiated HIV Services</small>
                  <h1>Hello, welcome!</h1>
                  <p style={{marginBottom: '0px'}}>Have questions regarding your account?</p>
                  <small >Contact us: <a href="mailto:admin@codebitestudios.codes">admin@codebitestudios.codes</a></small>
                  <button style={{marginTop:'7px'}} onClick={e => handleNavigate('/',e)} className="btn">Back to Login</button>
               </div>
            </div>
         </div>
      </div>
    </>
  )   
}

export default VerifyPage
