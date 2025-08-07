import "../styles/Modal.css"

type UserData = {
   hivnextid: number;
   email: string;
   username: string;
   myvasid: string;
   role: string;
   verified: boolean;
   createdAt: string;
   isLoggedIn: boolean;
}

export const Modal = (data: UserData, keyId: number) => {

   const vanishModal = () => {
      const modal = document.querySelector('.modal-container')
      modal?.classList.remove('open')
   }

  return (
    <div className="modal-container" onClick={vanishModal}>
      <div className="modal" onClick={e => e.stopPropagation()}>
         <h1>Edit user ID</h1>
         <form>
            <div className="inputs">
               <label htmlFor="email">Email:</label>
               <input type="email" value={data.email}/>
            </div>
            <div className="inputs">
               <label htmlFor="username">Username:</label>
               <input type="text" value={data.email}/>
            </div>
            <div className="inputs">
               <label htmlFor="myvasid">MyVAS ID:</label>
               <input type="text"/>
            </div>
            <div className="inputs">
               <label htmlFor="role">Role:</label>
               <div className="select-dropdown">
                  <select id="role">
                     <option value="user">User</option>
                     <option value="manager">Manager</option>
                     <option value="troller">Troller</option>
                  </select>
               </div>
            </div>
            <div>
               <div className="checkbox-wrapper-42">
                  <input id="verified" type="checkbox" />
                  <label className="cbx" htmlFor="verified"></label>
                  <label className="lbl" htmlFor="verified">Verified</label>
               </div>
            </div>
            <div>
               <button type="submit">Submit</button>
            </div>
         </form>
      </div>
    </div>
  )
}
