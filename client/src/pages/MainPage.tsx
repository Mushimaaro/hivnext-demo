import Header from '../components/Header.tsx'
import Sidebar from '../components/Sidebar.tsx'
import Footer from '../components/Footer.tsx'
import { Outlet } from 'react-router-dom'
import Loading from '../components/Loading.tsx'
import { useEffect } from 'react'
import useLoading from '../hooks/useLoading.tsx'


function MainPage() {
  const { vanishLoader} = useLoading()

  useEffect(() => {
    const vanish = async () => {
        await new Promise((resolve) => setTimeout(()=>{
          vanishLoader()
          return resolve;
        }, 4000))
    }

    vanish()
  }, [])

  return (
    <>
      <Sidebar/>
      <div id='background'></div>
      <div className="inner-container">
        <Header/>
        <div className='loading-div' style={{zIndex:10}}><Loading/></div>
        <div className='inner'>
          <Outlet/>
          <Footer/>
        </div>
      </div>
    </>
  )   
}

export default MainPage