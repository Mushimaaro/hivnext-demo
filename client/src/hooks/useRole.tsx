import { useContext } from "react";
import { RoleContext } from "../context/RoleProvider";

export const useRole = () => {
   return useContext(RoleContext);
}

export default useRole;