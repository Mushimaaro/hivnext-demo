import useRole from "../hooks/useRole";

type Props = {
   children: React.ReactNode;
   checkType?: string;
   Types?: Array<string>;
}

const Permission = ({children, checkType, Types}: Props) => {
  const {role} = useRole();

   const checkPermission = () => {
      if(checkType === "role"){
         if(Types?.find(str => str === role?.roleName))
            return true
         else
            return false
      } else if (checkType === "permission"){
         const result = role?.permission.forEach(element => {
            if(Types?.find(str => str === element))
               return true
            else
               return false
         });
         return result
      }else
         return false
   }

   return checkPermission() ? <>{children}</> : <></>
}

export default Permission