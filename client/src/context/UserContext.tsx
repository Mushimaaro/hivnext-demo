import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

export type User = {
   email: string,
   username?: string,
}

export interface UserContextInterface {
   user: User,
   setUser: Dispatch<SetStateAction<User>>
}

const defaultContextState = {
   user: {
      email: '',
      username: '',
   },
   setUser: (user: User) => {}
} as UserContextInterface

export const UserContext = createContext<UserContextInterface>(defaultContextState)

type UserProviderProps = {
   children: ReactNode
}

export default function UserProvider({children} : UserProviderProps){
   const [user, setUser] = useState<User>({email: ''})

   return (
      <UserContext.Provider value={{user, setUser}}>
         {children}
      </UserContext.Provider>
   )
}