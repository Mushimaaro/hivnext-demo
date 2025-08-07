import { createContext, useState } from "react";
import type { RoleProfile } from "../models/RoleModel";


type RoleContextType = {
   role: RoleProfile | null;
   setRole: (role: RoleProfile) => void;
};

type Props = {children : React.ReactNode};

export const RoleContext = createContext<RoleContextType>({} as RoleContextType);

export const RoleProvider = ({children}: Props) => {
   const [role, setRole] = useState<RoleProfile | null>(null)

   const handleSetRole = (roles: RoleProfile) => {
      setRole(prev => ({...prev, ...roles}))
   }

   

   return (
      <RoleContext.Provider value={{role:role, setRole:handleSetRole}}>
         {children}
      </RoleContext.Provider>
   )

}