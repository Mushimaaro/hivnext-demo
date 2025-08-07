import './styles/App.css'
import "./styles/transition.css"
import {keepTheme} from './scripts/theme.tsx'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './pages/MainPage.tsx'
import HomePage from './pages/01Home.tsx'
import DashboardPage from './pages/02Dashboard.tsx'
import DailyDatabasePage from './pages/03DailyDB.tsx'
import LinkToCarePage from './pages/04LinkCareDB.tsx'
import ActiveStaffPage from './pages/05ActiveStaff.tsx'
import TestNowPage from './pages/06TestNow.tsx'
import UsersPage from './pages/07Users.tsx'
import ReportsPage from './pages/08Reports.tsx'
import UploadPage from './pages/09Upload.tsx'
import FrontPage from './pages/FrontPage.tsx'
import VerifyPage from './pages/VerifyPage.tsx'
import MissingPage from './pages/MissingPage.tsx'
import ResetPasswordPage from './pages/ResetPasswordPage.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'
import PresistLogin from './components/PersistLogin.tsx'
import LoaderPage from './pages/LoaderPage.tsx'
import useLoading from './hooks/useLoading.tsx'
import SettingPage from './pages/SettingPage.tsx'
import { Toaster } from 'sonner'


const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute allowedRoles={['guest']}><FrontPage /></ProtectedRoute>
    },
    {
      path: '/verify-email',
      element: <ProtectedRoute allowedRoles={['user']}><VerifyPage /></ProtectedRoute>
    },
    {
      path: 'reset-password',
      element: <ResetPasswordPage />
    },
    {
      element: <PresistLogin />,
      children: [
        {
          path: 'index',
          element: <MainPage />,
          children: [
            {
              index: true,
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><HomePage /></ProtectedRoute>,
            },
            {
              path: 'admin-dashboard',
              element: <ProtectedRoute allowedRoles={['admin']}><DashboardPage /></ProtectedRoute>,
            },
            {
              path: 'dailydb',
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><DailyDatabasePage /></ProtectedRoute>,
            },
            {
              path: 'link-to-care',
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><LinkToCarePage /></ProtectedRoute>,
            },
            {
              path: 'active-staff',
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><ActiveStaffPage /></ProtectedRoute>,
            },
            {
              path: 'test-now',
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><TestNowPage /></ProtectedRoute>,
            },
            {
              path: 'users',
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><UsersPage /></ProtectedRoute>,
            },
            {
              path: 'reports',
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><ReportsPage /></ProtectedRoute>,
            },
            {
              path: 'upload',
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><UploadPage /></ProtectedRoute>,
            },
            {
              path: 'setting',
              element: <ProtectedRoute allowedRoles={['user', 'admin']}><SettingPage /></ProtectedRoute>,
            },
          ]
        },
      ]
    },
    {
      path: '*',
      element: <MissingPage />,
    }
]);

function App() {
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

  useEffect(() => {
    keepTheme()
  }) 

  return (
    <>
      <RouterProvider router={router}/>
      <LoaderPage/>
      <Toaster position='bottom-center' toastOptions={{
        style: {
          background: 'var(--color-background)',
          color: 'var(--text-color)',
          borderColor: 'transparent',
          fontFamily: 'Nunito, san-serif',
        }
      }}/>
    </>
  )
}

export default App
