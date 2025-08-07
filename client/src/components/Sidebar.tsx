import { RiDashboardFill, RiHome5Fill, RiDatabaseFill, RiCalendar2Fill, RiHealthBookFill, RiUserAddFill, RiCheckDoubleFill, RiShieldUserFill, RiFileChartFill, RiFileUploadFill, RiCloseFill, RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import { MdLogout } from "react-icons/md"
import { useState } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import Permission from './Permission';
import TransitionLink from '../routes/TransitionNavigate';
import useLoading from '../hooks/useLoading';

const Sidebar = () => {
   const navigate = useNavigate();
   const location = useLocation();
  const navigation = useNavigation();
   const [active, setActive] = useState(false)
   const logout = useLogout();
   const { vanishLoader, appearLoader } = useLoading()

   const handleNavigate = (loc: string, e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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

   function handleActive() {
      setActive(a => !a)
   }

   const closeMenu = () => {
      const sidebar = document.querySelector<HTMLElement>('.sidebar');
      if(sidebar){
         sidebar.style.display = 'none'
         sidebar.style.opacity = '0'
      }
   }


   return (
      <aside className="sidebar">
         <div className="top">
            <div className="logo">
               <img src="https://olive-odella-90.tiiny.site/HIVnext.svg" alt="HIVnext" />
            </div>
            <div className="close" id="close-btn" onClick={() => closeMenu()}>
               <RiCloseFill className="close-icon"/>
            </div>
         </div>

         <div className="sidebar-list">
            <TransitionLink to="/index">
               <RiHome5Fill className="sidebar-icons"/>
               <h3>Home</h3>
            </TransitionLink>
            <Permission checkType='role' Types={['admin']}>
               <TransitionLink to="/index/admin-dashboard">
               <RiDashboardFill className="sidebar-icons"/>
               <h3>Admin Dashboard</h3>
            </TransitionLink>
            </Permission>
            
            <a className='sub-menu' onClick={()=> handleActive()}>
               <RiDatabaseFill className="sidebar-icons"/>
               <h3>DHSKP</h3>
               <RiArrowUpSLine className={`sidebar-icons up-down ${active?'active':''}`}/>
               <RiArrowDownSLine className={`sidebar-icons up-down ${active?'':'active'}`}/>
            </a>
            <div className={`dhskp ${active?'show':''}`}>
               <div>
                  <TransitionLink to="/index/dailydb">
                     <RiCalendar2Fill className="sidebar-icons"/>
                     <h3>Daily Database</h3>
                  </TransitionLink>
                  <TransitionLink to="/index/link-to-care">
                     <RiHealthBookFill className="sidebar-icons"/>
                     <h3>Link to Care Database</h3>
                  </TransitionLink>
                  <TransitionLink to="/index/active-staff">
                     <RiUserAddFill className="sidebar-icons"/>
                     <h3>Active Staffs</h3>
                  </TransitionLink>
               </div>
               
            </div>
            <TransitionLink to="/index/test-now">
               <RiCheckDoubleFill className="sidebar-icons"/>
               <h3>TestNow</h3>
            </TransitionLink>
            <TransitionLink to="/index/users">
               <RiShieldUserFill className="sidebar-icons"/>
               <h3>Users</h3>
            </TransitionLink>
            <TransitionLink to="/index/reports">
               <RiFileChartFill className="sidebar-icons"/>
               <h3>Reports</h3>
            </TransitionLink>
            <TransitionLink to="/index/upload">
               <RiFileUploadFill className="sidebar-icons"/>
               <h3>Upload</h3>
            </TransitionLink>
            <a className='last' onClick={e => handleNavigate('/',e)}>
               <MdLogout className="sidebar-icons"/>
               <h3>Logout</h3>
            </a>
         </div>
      </aside>
   )
}

export default Sidebar
