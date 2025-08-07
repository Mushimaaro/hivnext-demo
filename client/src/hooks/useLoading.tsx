import { useContext } from "react";
import { LoadingContext } from "../context/LoadingProvider";

export const useLoading = () => {
   return useContext(LoadingContext);
}

export default useLoading;