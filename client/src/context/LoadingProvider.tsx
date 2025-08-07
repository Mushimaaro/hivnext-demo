import { createContext, useState } from "react";
import React from "react";


type CounterContextType = {
   counter: number;
   setCounter: (counter: number) => void;
   isRedirect: boolean;
   setIsRedirect: (condition: boolean) => void;
   isLoad: boolean;
   setIsLoad: (state: boolean) => void;
   appearLoader: () => void;
   vanishLoader: () => void;
};

type Props = {children : React.ReactNode};

export const LoadingContext = createContext<CounterContextType>({} as CounterContextType);

export function LoadingProvider({ children }: Props) {
   const [counter, setCounter] = useState<number>(0);
   const [isRedirect, setIsRedirect] = useState<boolean>(false);
   const [isLoad, setIsLoad] = useState<boolean>(false);

   const vanishLoader = () => {
      const loader = document.querySelector(".bg-back")
      loader?.classList.remove("appear")
      loader?.classList.add("vanish")
   }

   const appearLoader = () => {
      const loader = document.querySelector(".bg-back")
      loader?.classList.remove("vanish")
      loader?.classList.add("appear")
   }

   return (
      <LoadingContext.Provider value={{ counter: counter, setCounter: setCounter, isRedirect: isRedirect, setIsRedirect: setIsRedirect, isLoad: isLoad, setIsLoad: setIsLoad, vanishLoader:vanishLoader, appearLoader:appearLoader}}>
         {children}
      </LoadingContext.Provider>
   );
}