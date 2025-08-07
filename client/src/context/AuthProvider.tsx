import { createContext, useState } from "react";
import type { UserProfileToken } from "../models/UserModel.ts";
import React from "react";


type UserContextType = {
   auth: UserProfileToken | null;
   setAuth: (auth: UserProfileToken) => void;
   isLogin: boolean;
   setIsLogin: (state: boolean) => void;
};

type Props = {children : React.ReactNode};

export const AuthContext = createContext<UserContextType>({} as UserContextType);

export function AuthProvider({ children }: Props) {
   const [auth, setAuth] = useState<UserProfileToken | null>(null);
   const [isLogin, setIsLogin] = useState<boolean>(false)

   return (
      <AuthContext.Provider value={{ auth: auth, setAuth: setAuth, isLogin: isLogin, setIsLogin: setIsLogin}}>
         {children}
      </AuthContext.Provider>
   );
}
