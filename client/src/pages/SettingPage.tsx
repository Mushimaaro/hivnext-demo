import "../styles/settingPage.css"
import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


function SettingPage() {
   const inputsRef = useRef<HTMLInputElement>(null);
   const selectRef = useRef<HTMLSelectElement>(null)

   useEffect(()=>{
      if (inputsRef.current) {
         inputsRef.current.disabled = true;
      }
      if (selectRef.current) {
         selectRef.current.disabled = true;
      }
   },[])

   const toggleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      const button = document.querySelectorAll(".edit button")
      button.forEach(element => {
         element.classList.toggle("open");
      });
      
      const inputs = document.querySelectorAll(".general")
      inputs.forEach(element => {
         if(element.lastElementChild?.classList.value === "dropdown-role"){
            const select = element.lastElementChild?.firstElementChild as HTMLSelectElement
            if(select)
               select.disabled = false;
         }else{
            const input = element.lastElementChild as HTMLInputElement
            if(input)
               input.disabled = false;
         }
      });

      const pwfield = document.querySelector(".re-password")
      pwfield?.classList.toggle("open");
   }

   const saveEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      const button = document.querySelectorAll(".edit button")
      button.forEach(element => {
         element.classList.toggle("open");
      });

      const inputs = document.querySelectorAll(".general")
      inputs.forEach(element => {
         if(element.lastElementChild?.classList.value === "dropdown-role"){
            const select = element.lastElementChild?.firstElementChild as HTMLSelectElement
            if(select)
               select.disabled = true;
         }else{
            const input = element.lastElementChild as HTMLInputElement
            if(input)
               input.disabled = true;
         }
      });

      const pwfield = document.querySelector(".re-password")
      pwfield?.classList.toggle("open");
   }

   return (
      <main className="main">
         <h1>Setting (under construction)</h1>
         <div className="setting-outer-container">
            <div className="setting-container">
               <div className="upper-border"/>
               <form className="information">
                  <div className="profile">
                     <div className="pic-div">
                        <div className="profile-pic">
                           <img />
                        </div>
                     </div>
                     <div className="info">
                        <h2>Mushimaro</h2>
                        <p>ID: 0000</p>
                     </div>
                  </div>
                  <div className="edit">
                     <button className="open" onClick={e=> toggleEdit(e)}>Edit</button>
                     <button type="submit" onClick={e=> saveEdit(e)}>Save</button>
                  </div>
                  <div className="username general">
                     <span>Username</span>
                     <input type="text" value={"Mushimaro"} ref={inputsRef} disabled/>
                  </div>
                  <div className="email general">
                     <span>Email</span>
                     <input type="email" ref={inputsRef} disabled/>
                  </div>
                  <div className="myvasid general">
                     <span>MyVAS ID</span>
                     <input type="text" ref={inputsRef} disabled/>
                  </div>
                  <div className="role general">
                     <span>Role</span>
                     <div className="dropdown-role">
                        <select id="role" ref={selectRef} disabled>
                           <option value="user">User</option>
                        </select>
                     </div>
                     
                  </div>
                  <div className="password general">
                     <span>Password</span>
                     <input type="password" ref={inputsRef} disabled/>
                  </div>
                  <div className="re-password general">
                     <span>Retype Password</span>
                     <input type="password" ref={inputsRef} disabled/>
                  </div>
               </form>
            </div>
         </div>
         
      </main>
   )
}

export default SettingPage