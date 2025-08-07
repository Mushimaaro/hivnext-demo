import { RiMenuFill, RiListSettingsLine } from "react-icons/ri";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState, useEffect } from "react";
import { setTheme } from '../scripts/theme.tsx'
import useAuth from "../hooks/useAuth.tsx";
import useRole from "../hooks/useRole.tsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.tsx";
import TransitionLink from "../routes/TransitionNavigate.tsx";

function Header() {
   const [active, setActive] = useState(false)
   const {auth} = useAuth();
   const {role} = useRole();
   const [username, setUsername] = useState("");
   const axiosPrivate = useAxiosPrivate();
   
   const openMenu = () => {
      const sidebar = document.querySelector<HTMLElement>('.sidebar');
      if(sidebar){
         sidebar.style.display = 'block'
         sidebar.style.opacity = '1'
      }
   }

   window.addEventListener('resize', () => {
      const sidebar = document.querySelector<HTMLElement>('.sidebar');  
      if(window.innerWidth >= 897){
         if(sidebar){
            sidebar.style.display = 'block'
            sidebar.style.opacity = '1'
         }
      }
      else {
         if(sidebar){
            sidebar.style.display = 'none'
            sidebar.style.opacity = '0'
         }
      }
    });

   let theme = localStorage.getItem('theme');

   const handleActive = () => {
      if(localStorage.getItem('theme') === 'light-theme'){
         setTheme('dark-theme');
         setActive(true);
      }else{
         setTheme('light-theme');
         setActive(false);
      }
   }

   useEffect(() => {
      if(localStorage.getItem('theme') === 'dark-theme'){
         setActive(true)
      }else if (localStorage.getItem('theme') === 'light-theme'){
         setActive(false)
      }
   }, [theme])

   useEffect(()=>{
      getUsername()
   },[])

   const formatRole = () => {
      let rol = role?.roleName
      if(rol)
         rol = `${String(rol[0]).toUpperCase()}${rol?.substring(1,rol.length)}`
      return rol
   }

   const getUsername = () => {
      const getNameByID = async () => {
         try {
            const response = await axiosPrivate.post('/user/get', {userId: auth?.userInfo.userId})
            if(response.data){
               setUsername(response.data.userData.username)
            }
         } catch (error:any) {
            console.log(error.message)
         }
      } 
      getNameByID()
   }

   return (
      <header className="header">
         <div className="header-container">
            <div className="left">
               <button id="menu-btn" onClick={() => openMenu()}>
                  <RiMenuFill className="menu-icon"/>
               </button>
            </div>
            <div className="right">
               <div className="theme-toggler" onClick={() => handleActive()}>
                  <MdLightMode className={`toggler-icon ${active? "" : "active"}`}/>
                  <MdDarkMode className={`toggler-icon ${active? "active" : ""}`}/>
               </div>
               <div className="profile">
                  <div className="info">
                     <p>Hey, <b>{username}</b></p>
                     <small className="text-muted">{formatRole()}</small>
                  </div>
                  <div className="setting">
                     <TransitionLink to="/index/setting">
                        <RiListSettingsLine />
                     </TransitionLink>
                  </div>
                  <div className="profile-pic">
                     <span>{String(username[0]).toUpperCase()}</span>
                  </div>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header