import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { RoleProvider } from './context/RoleProvider.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { LoadingProvider } from './context/LoadingProvider.tsx'

createRoot(document.getElementById('container')!).render(
  <StrictMode>
    <AuthProvider>
      <RoleProvider>
        <LoadingProvider>
          <App/>
        </LoadingProvider>
      </RoleProvider>
    </AuthProvider>
  </StrictMode>
)
