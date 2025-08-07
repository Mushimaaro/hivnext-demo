export const CheckPassword = (password:string) => {
   const criteria = [
      {label: "Must be at least 8 characters", met: password.length >= 8},
      {label: "Must contains upercase letter", met: /[A-Z]/.test(password)},
      {label: "Must contains lowercase letter", met: /[a-z]/.test(password)},
      {label: "Must contains a number", met: /[\d]/.test(password)},
      {label: "Must contains special character", met: /[_#?!@$%^&*-]/.test(password)},
   ];

   let obj = {message: "", success: true}
   criteria.forEach(element => {
      if(!element.met){
         obj = {...obj, message:element.label, success:false}
         return
      }
   });

   return obj
}

export const CheckEmail = (email:string) => {
   const criteria = [
      {label: "Must at least 5 characters", met: email.length >= 5},
      {label: "Not a vaild email", met: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)},

   ];

   let obj = {message: "", success: true}
   criteria.forEach(element => {
      if(!element.met){
         obj = {...obj, message:element.label, success:false}
         return
      }
   });

   return obj
}
