import { createContext, useState } from "react";
import type { UserProfileToken } from "../models/UserModel.ts";
import React from "react";


type UserContextType = {
   auth: UserProfileToken | null;
   setAuth: (auth: UserProfileToken) => void;
   isLogin: boolean;
   setIsLogin: (state: boolean) => void;
   returnType: number;
   setReturnType: (type: number) => void; 
};

type Props = {children : React.ReactNode};

export const AuthContext = createContext<UserContextType>({} as UserContextType);

export function AuthProvider({ children }: Props) {
   const [auth, setAuth] = useState<UserProfileToken | null>(null);
   const [isLogin, setIsLogin] = useState<boolean>(false)
   const [returnType, setReturnType] = useState(0)

   return (
      <AuthContext.Provider value={{ auth: auth, setAuth: setAuth, isLogin: isLogin, setIsLogin: setIsLogin, returnType: returnType, setReturnType: setReturnType }}>
         {children}
      </AuthContext.Provider>
   );
}