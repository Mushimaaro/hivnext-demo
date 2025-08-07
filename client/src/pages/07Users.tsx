import { useEffect, useState } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiArrowDownSLine, RiArrowUpSLine, RiArrowRightSLine, RiArrowLeftSLine, RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri'
import { toast } from 'sonner'
import "../styles/usersPage.css"
import "../styles/Warning.css"
import "../styles/Modal.css"


type UserData = {
   userId: string;
   hivnextid: number;
   email: string;
   username: string;
   myvasid: string;
   role: string;
   verified: boolean;
   createdAt: string;
   isLoggedIn: boolean;
}

type MetaData = {
   totalDocuments: number;
   pageNumber: number;
   totalPages: number;
   count: number;
}

type Data = {
   hivnextid: number;
   email: string;
   username: string;
   myvasid: string;
   role: string;
   verified: boolean;
}

type RoleData = {
   roleId: string;
   role: string;
   permission: string[];
   createdAt: string;
}


function UsersPage() {
   const [users, setUsers] = useState<UserData[]>([])
   const [currentUser, setCurrentUser] = useState<Data|null>(null)
   const [metaData, setMetaData] = useState<MetaData|null>(null)
   const [pageArray, setPageArray] = useState<number[]>([])
   const [currentPage, setCurrentPage] = useState(1)
   const [trigger, setTrigger] = useState(false)
   const [pageLimit, setPageLimit] = useState(5)
   const [focusUser, setFocusUser] = useState<string>('')
   const [edit, setEdit] = useState(false)
   const [isSorting, setIsSorting] = useState(false)
   const [sortValue, setSortValue] = useState('{"hivnextid":1}')
   const axiosPrivate = useAxiosPrivate()

   const [searchText, setSearchText] = useState("")
   const [category, setCategory] = useState('hivnextid')
   const [isSearching, setIsSearching] = useState(false)
   const [triggerSearch, setTriggerSearch] = useState(false)

   const [allRoles, setAllRoles] = useState<RoleData[]>([])
   const [email, setEmail] = useState<string>('')
   const [username, setUsername] = useState<string>('')
   const [myvasid, setMyvasid] = useState<string>('')
   const [role, setRole] = useState<string>('')
   const [verified, setVerified] = useState<boolean>(false)

   useEffect(()=>{
      if(isSorting && isSearching){
         if(category === "hivnextid"){
            getUsers(`{
               "$expr": {
                  "$gt": [
                     { 
                        "$size": { 
                           "$regexFindAll": { 
                              "input": {"$toString": "$hivnextid"}, 
                              "regex": "${searchText}" 
                           }
                        }
                     }, 
                     0
                  ]
               }
            }`);
         }else if(category === "verified")
            getUsers(`{"${category}": ${searchText==='true'?true:searchText==="false"?false:`{"$in": [true,false]}`}}`);
         else
            getUsers(`{"${category}": { "$regex": "${searchText}"}}`);
      } else if(isSearching) {
         if(category === "hivnextid"){
            getUsers(`{
               "$expr": {
                  "$gt": [
                     { 
                        "$size": { 
                           "$regexFindAll": { 
                              "input": {"$toString": "$hivnextid"}, 
                              "regex": "${searchText}" 
                           }
                        }
                     }, 
                     0
                  ]
               }
            }`);
         }else if(category === "verified")
            getUsers(`{"${category}": ${searchText==='true'?true:searchText==="false"?false:`{"$in": [true,false]}`}}`);
         else 
            getUsers(`{"${category}": { "$regex": "${searchText}"}}`);
      }
      else
         getUsers()

      return () => {
         setIsSorting(false);
         setTriggerSearch(false);
         setTrigger(false)
      }
   },[isSorting, triggerSearch, trigger])
   

   useEffect(()=>{
      getAllRoles()
   },[])

   const getUsers = async (filter: string = "{}") => {
      try {
         const response = await axiosPrivate.get('user/get-all',{params:{
            page: currentPage,
            limit: pageLimit,
            filter: filter,
            sort: sortValue 
         }})
         if(response.data.success){
            setUsers(response.data.usersData)
            setMetaData(response.data.metaData)
            setPageArray([])
            for(let i=1; i<=response.data.metaData.totalPages; i++){
               setPageArray(arr => [...arr, i])
            }
         }
      } catch (error: any) {
         toast.error(error.message)
      }
   }

   const formatDate = (datestring: string) => {
      const date = new Date(datestring);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return (`${day}-${month}-${year}`);
   }

   const getAllRoles = async () => {
      const response = await axiosPrivate.get('role/get-all')
      if(response.data.rolesData)
      setAllRoles(response.data.rolesData)
   } 

   const editRow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setEdit(false);
      const clickedElement = e.target as HTMLElement;
      const rowElement = clickedElement.closest('tr');
      if(rowElement){
         const dataKey = rowElement.dataset.key;
         if(dataKey !== undefined){
            const user = users.filter(obj => obj.hivnextid === parseInt(dataKey))
            setFocusUser(user[0].userId)
         }

         const userElement = document.querySelectorAll(`tr[data-key="${dataKey}"] td`)
         
         let userData = {} as Data
         for(let i = 0; i<6; i++){
            if(i===0){
               userData = {...userData, hivnextid:parseInt(userElement[i].innerHTML)}
            }if(i===1){
               userData = {...userData, email:userElement[i].innerHTML}
            }if(i===2){
               userData = {...userData, username:userElement[i].innerHTML}
            }if(i===3){
               userData = {...userData, myvasid:userElement[i].innerHTML}
            }if(i===4){
               userData = {...userData, role:userElement[i].innerHTML}
            }if(i===5){
               const bolstring = userElement[i].innerHTML;
               userData = {...userData, verified:(bolstring==='true'?true:false)}
            }
         }
         setCurrentUser(u => ({...u, ...userData}))
         setEdit(true)

         const email = document.querySelector<HTMLInputElement>('.email-modal')
         if(email){
            email.value = userData.email
            setEmail(userData.email)
         }

         const username = document.querySelector<HTMLInputElement>('.username-modal')
         if(username){
            username.value = userData.username
            setUsername(userData.username)
         }
         
         const myvasid = document.querySelector<HTMLInputElement>('.myvasid-modal')
         if(myvasid){
            myvasid.value = userData.myvasid
            setMyvasid(userData.myvasid)
         }
         
         const select = document.querySelector<HTMLSelectElement>('.select-modal')
         if(select){
            select.value = userData.role
            setRole(userData.role)
         }

         const checkbox = document.querySelector<HTMLInputElement>('.checkbox-modal')
         if(checkbox){
            checkbox.checked = userData.verified
            setVerified(userData.verified)
         }

         const modal = document.querySelector('.modal-container')
         modal?.classList.add('open')
      }
   }

   const vanishModal = () => {
      const modal = document.querySelector('.modal-container')
      modal?.classList.remove('open')
   }

   const vanishWarning = () => {
      const modal = document.querySelector('.warning-container')
      modal?.classList.remove('open')
   }

   const deleteRow = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const clickedElement = e.target as HTMLElement;
      const rowElement = clickedElement.closest('tr');
      if(rowElement){
         const dataKey = rowElement.dataset.key;
         if(dataKey !== undefined){
            const user = users.filter(obj => obj.hivnextid === parseInt(dataKey))
            setFocusUser(user[0].userId)
         }

         const userElement = document.querySelectorAll(`tr[data-key="${dataKey}"] td`)
         
         let userData = {} as Data
         for(let i = 0; i<6; i++){
            if(i===0){
               userData = {...userData, hivnextid:parseInt(userElement[i].innerHTML)}
            }if(i===1){
               userData = {...userData, email:userElement[i].innerHTML}
            }if(i===2){
               userData = {...userData, username:userElement[i].innerHTML}
            }if(i===3){
               userData = {...userData, myvasid:userElement[i].innerHTML}
            }if(i===4){
               userData = {...userData, role:userElement[i].innerHTML}
            }if(i===5){
               const bolstring = userElement[i].innerHTML;
               userData = {...userData, verified:(bolstring==='true'?true:false)}
            }
         }
         setCurrentUser(u => ({...u, ...userData}))
      }
      const modal = document.querySelector('.warning-container')
      modal?.classList.add('open')
   }

   const toggleSort = (target: string) => {
      const allsvg = document.querySelectorAll(`.up-down-sort`)
      for(let i=0; i< allsvg.length; i++){
         if(allsvg[i]?.classList[1] !== target){
            if(allsvg[i]?.children[0].classList[0] === "toggle"){
               allsvg[i]?.children[0].classList.toggle("toggle")
               allsvg[i]?.children[1].classList.toggle("toggle")
            } 
         }
      }
      const svg = document.querySelector(`.up-down-sort.${target}`)
      svg?.children[0].classList.toggle("toggle")
      svg?.children[1].classList.toggle("toggle")
      if(svg?.children[0].classList.value){
         setSortValue(`{"${target}":-1}`)
      }else{
         setSortValue(`{"${target}":1}`)
      }
      setIsSorting(true);
   }

   const searchForm = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsSearching(true)
      setTriggerSearch(true);
   }

   const Pagination = (e: React.MouseEvent<HTMLButtonElement>) => {
      const clicked = e.target as HTMLElement
      const page = parseInt(clicked.innerText)
      if(clicked.classList.value === "selected")
         return
      setCurrentPage(page)
      setTrigger(true)
   }

   const arrowPagination = (e: React.MouseEvent<HTMLButtonElement>) => {
      const clicked = e.target as HTMLElement
      let page = currentPage;
      let lastpage = 1
      if(metaData?.totalPages)
         lastpage = metaData?.totalPages

      if(clicked.parentElement?.classList.value === "double-left"){
         page = 1
      }
      if(clicked.parentElement?.classList.value === "left"){
         if(page === 1)
            return
         page = page - 1
      }
      if(clicked.parentElement?.classList.value === "double-right"){
         page = lastpage
      }
      if(clicked.parentElement?.classList.value === "right"){
         if(page === lastpage)
            return
         page = page + 1 
      }
      setCurrentPage(page);
      setTrigger(true)
   }

   const handlePages = (limit: number) => {
      setPageLimit(limit)
      setCurrentPage(1)
      setTrigger(true)
   }

   const handleEditForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
         await axiosPrivate.put('user/update', {userId: focusUser, email: email, username: username, myvasid: myvasid, role: role, verified: verified})
      } catch (error:any) {
         toast.error(error.message)
      }
      vanishModal()
      toast.success('successfully updated user!')
      setTrigger(true)
   } 

   const deleteUser = async () => {
      try {
         await axiosPrivate.delete('user/delete', {data:{userId: focusUser}})
      } catch (error:any) {
         toast.error(error.message)
      }
      vanishWarning()
      toast.success('successfully deleted user!')
      setTrigger(true)
   }

   return (
      <main className="main">
         <h1>Users</h1>
         <div className="user-table-container">
            <form onSubmit={e => searchForm(e)}>
               <div className="searchbar">
                  <div>
                     <label htmlFor="search">What are you looking for?</label>
                     <input id="search" onChange={e => setSearchText(e.target.value)} />
                  </div>
                  <div>
                     <label htmlFor="category">Category</label>
                     <div className="dropdown-category">
                        <select id="category" onChange={e => setCategory(e.target.value)}>
                           <option value="hivnextid">User ID</option>
                           <option value="email">Email</option>
                           <option value="username">Username</option>
                           <option value="myvasid">MyVAS ID</option>
                           <option value="role">Role</option>
                           <option value="verified">Verified</option>
                        </select>
                     </div>
                  </div>
                  <div className="search-div">
                     <div></div>
                     <button type="submit">Search</button>
                  </div>
               </div>
            </form>
            
            <table>
               <thead className="navigation">
                  <tr>
                     <th colSpan={10}>
                        <button className="double-left" onClick={e=>arrowPagination(e)}>
                           <RiArrowLeftDoubleLine className="double-left"/>
                        </button>
                        <button className="left" onClick={e=>arrowPagination(e)}>
                           <RiArrowLeftSLine className="left"/>
                        </button>
                        {
                        pageArray.length>=7
                        ?(currentPage<=3
                           ?(pageArray.map(no =>{return(<>
                           {
                              no<=3
                              ?(<button className={currentPage===no?"selected":""} onClick={e=>Pagination(e)}>{no}</button>)
                              :no===pageArray.length
                                 ?(<><span>...</span><button onClick={e=>Pagination(e)}>{no}</button></>)
                                 :<></>
                           }
                           </>)}))
                           :currentPage>=pageArray.length-2
                           ?(pageArray.map(no =>{return(<>
                           {
                              no === 1
                              ?(<><button onClick={e=>Pagination(e)}>{no}</button><span>...</span></>)
                              : no>=pageArray.length-2
                                 ? (<button className={currentPage===no?"selected":""} onClick={e=>Pagination(e)}>{no}</button>)
                                 : <></>
                           }
                           </>)}))
                           :currentPage>3&&currentPage<pageArray.length-2
                           ?(pageArray.map(no =>{return(<>
                           {
                              no === 1
                              ?(<><button onClick={e=>Pagination(e)}>{no}</button><span>...</span></>)
                              : no === currentPage
                                 ?(<><button onClick={e=>Pagination(e)}>{no-1}</button><button className="selected" onClick={e=>Pagination(e)}>{no}</button><button onClick={e=>Pagination(e)}>{no+1}</button></>)
                                 : no === pageArray.length
                                    ?(<><span>...</span><button onClick={e=>Pagination(e)}>{no}</button></>)
                                    :<></>
                           }
                           </>)}))
                           :<></>
                        )
                        :pageArray.length===6
                        ?(currentPage<=3
                           ?(pageArray.map(no =>{return(<>
                           {
                              no<=3
                              ?(<><button className={no===currentPage?"selected":""} onClick={e=>Pagination(e)}>{no}</button></>)
                              :no===6
                                 ?(<><span>...</span><button onClick={e=>Pagination(e)}>{no}</button></>)
                                 :<></>
                           }
                           </>)}))
                           :currentPage>=4
                           ?(pageArray.map(no =>{return(<>
                           {
                              no===1
                              ?(<><button onClick={e=>Pagination(e)}>{no}</button><span>...</span></>)
                              :no>=4
                                 ?(<><button className={no===currentPage?"selected":""} onClick={e=>Pagination(e)}>{no}</button></>)
                                 :<></>
                           }
                           </>)}))
                           :<></>
                        )
                        :pageArray.length<=5
                        ?(pageArray.map(no=>{return(<>
                           <button className={no===currentPage?"selected":""} onClick={e=>Pagination(e)}>{no}</button>
                        </>)}))
                        :<></>
                        }

                        <button className="right" onClick={e=>arrowPagination(e)}>
                           <RiArrowRightSLine className="right"/>
                        </button>
                        <button className="double-right" onClick={e=>arrowPagination(e)}>
                           <RiArrowRightDoubleLine className="double-right"/>
                        </button>
                           <select id="pages" className="pages" onChange={e => handlePages(parseInt(e.target.value))}>
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="15">15</option>
                              <option value="20">20</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                           </select>
                     </th>
                  </tr>
               </thead>
               <thead className="head">
                  <tr>
                     <th onClick={() => toggleSort("hivnextid")}><div><div>User ID</div><div className="up-down-sort hivnextid"><RiArrowDownSLine/><RiArrowUpSLine className="toggle"/></div></div></th>
                     <th onClick={() => toggleSort("email")}><div><div>Email</div><div className="up-down-sort email"><RiArrowDownSLine/><RiArrowUpSLine className="toggle"/></div></div></th>
                     <th onClick={() => toggleSort("username")}><div><div>Username</div><div className="up-down-sort username"><RiArrowDownSLine/><RiArrowUpSLine className="toggle"/></div></div></th>
                     <th onClick={() => toggleSort("myvasid")}><div><div>MyVAS ID</div><div className="up-down-sort myvasid"><RiArrowDownSLine/><RiArrowUpSLine className="toggle"/></div></div></th>
                     <th onClick={() => toggleSort("role")}><div><div>Role</div><div className="up-down-sort role"><RiArrowDownSLine/><RiArrowUpSLine className="toggle"/></div></div></th>
                     <th onClick={() => toggleSort("verified")}><div><div>Verified</div><div className="up-down-sort verified"><RiArrowDownSLine/><RiArrowUpSLine className="toggle"/></div></div></th>
                     <th onClick={() => toggleSort("createdAt")}><div><div>Created at</div><div className="up-down-sort createdAt"><RiArrowDownSLine/><RiArrowUpSLine className="toggle"/></div></div></th>
                     <th onClick={() => toggleSort("isLoggedIn")}><div><div>Online</div><div className="up-down-sort isLoggedIn"><RiArrowDownSLine/><RiArrowUpSLine className="toggle"/></div></div></th>
                     <th colSpan={2}>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map(user => { return (
                     <tr data-key={user.hivnextid} key={user.hivnextid}>
                        <td>{String(user.hivnextid).padStart(4, '0')}</td>
                        <td>{user.email }</td>
                        <td>{user.username}</td>
                        <td>{user.myvasid}</td>
                        <td>{user.role}</td>
                        <td>{user.verified?"true":"false"}</td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>{user.isLoggedIn?"🟢":"🔴"}</td>
                        <td>
                           <button className="edit" onClick={e => editRow(e)}><FaEdit/></button>
                        </td>
                        <td>
                           <button className="delete" onClick={e => deleteRow(e)}><FaTrashAlt/></button>
                        </td>
                     </tr>
                  )})}
               </tbody>
            </table>
         </div>
         <div className="modal-container" onClick={vanishModal}>
            <div className="modal" onClick={e => e.stopPropagation()}>
               <h1>{`Edit user ID ${edit?String(currentUser?.hivnextid).padStart(4, '0'):""}`}</h1>
               <form onSubmit={e=>handleEditForm(e)}>
                  <div className="inputs">
                     <label htmlFor="email">Email:</label>
                     <input type="email" className="email-modal" onChange={e=>setEmail(e.target.value)}/>
                  </div>
                  <div className="inputs">
                     <label htmlFor="username">Username:</label>
                     <input type="text" className="username-modal" onChange={e=>setUsername(e.target.value)}/>
                  </div>
                  <div className="inputs">
                     <label htmlFor="myvasid">MyVAS ID:</label>
                     <input type="text" className="myvasid-modal" onChange={e=>setMyvasid(e.target.value)}/>
                  </div>
                  <div className="inputs">
                     <label htmlFor="role">Role:</label>
                     <div className="select-dropdown">
                        <select id="role" className="select-modal"  onChange={e=>setRole(e.target.value)}>
                           {
                              allRoles.map(role=> {return(
                                 <option value={role.role}>{`${String(role.role[0]).toUpperCase()}${role.role.substring(1,role.role.length)}`}</option>
                              )})
                           }
                        </select>
                     </div>
                  </div>
                  <div>
                     <div className="checkbox-wrapper-42">
                        <input id="verified" className="checkbox-modal" type="checkbox" onChange={e=>setVerified(e.target.checked)}/>
                        <label className="cbx" htmlFor="verified"></label>
                        <label className="lbl" htmlFor="verified">Verified</label>
                     </div>
                  </div>
                  <button type="submit">Submit</button>
               </form>
            </div>
         </div>

         <div className="warning-container" onClick={vanishWarning}>
            <div className="warning" onClick={e => e.stopPropagation()}>
               <div className="warning-message-container">
                  <h2>Are you sure you want to delete the following user?</h2>
               </div>
               <div className="user-details">
                  <div>User ID</div><div>: {String(currentUser?.hivnextid).padStart(4, '0')}</div>
                  <div>Email</div><div>: {currentUser?.email}</div>
                  <div>Username</div><div>: {currentUser?.username}</div>
                  <div>MyVAS ID</div><div>: {currentUser?.myvasid}</div>
                  <div>Role</div><div>: {currentUser?.role}</div>
               </div>
               <div className="confirm-button-container">
                  <button onClick={deleteUser}>Confirm</button>
               </div>
               
            </div>
         </div>
      </main>
   )
}

export default UsersPage