import { useEffect } from "react"
import { normalAxios } from "../api/axiosAPI"
import useAxios from "../hooks/useAxios"

const VerifyPage = () => {
  const [res, err, loading, fetchData] = useAxios()

  const getData = () => {
    fetchData({
      axiosInstance: normalAxios,
      method: 'POST',
      url: 'role/get',
      requestConfig: {
        data: {
          roleId: '687f465d29430d0463b278b3'
        }
      }
    })
  }

  useEffect(() => {
    getData()
  },[])

  return ( 
    <div className="verify-container">
      <h1>VerifyPage</h1>
      {loading && <p>Loading</p>}
      {!loading && err && <p>{err}</p>}
      {!loading && !err && res && <p>{res?.roleName}</p>}
    </div>
  )
}

export default VerifyPage