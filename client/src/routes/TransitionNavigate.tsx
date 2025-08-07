import type { ReactNode } from "react"
import { useLocation, useNavigate, type LinkProps, type To, Link } from "react-router-dom"


interface TransitionLinkProps extends LinkProps {
   children: ReactNode;
   to: To;
}

const TransitionLink = ( {children, to, ...props}: TransitionLinkProps ) => {
   const navigate = useNavigate();
   const location = useLocation();


   const wait = async () =>  {
      await new Promise((resolve) => setTimeout(()=>{
         navigate(to, { state:{ from: location.pathname}, replace: true});
         setTimeout(()=>{
            const motion = document.querySelector(".loading-div")
            motion?.classList.remove("open")
         },100)
         return resolve
      },500))
   }

   const handleTransition =  (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const motion = document.querySelector(".loading-div")
      motion?.classList.add("open")
      wait();
   }

   return <Link to={to} onClick={handleTransition} {...props}>
      {children}
   </Link>
}

export default TransitionLink;