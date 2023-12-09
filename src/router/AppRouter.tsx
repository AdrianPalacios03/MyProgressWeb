import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { ProgressPage } from '../pages/ProgressPage'
import { Login } from '../pages/login/Login'
import { useAppSelector } from '../hooks/reduxHooks'
import { useEffect, useState } from 'react'
import beforeInstallPromptEvent from '../beforeInstallPromptEvent'
import downloadApp from '../downloadApp';
import { Notes } from '../pages/notes/Notes'

export const AppRouter = () => {
  const auth = useAppSelector((state) => state.auth.authenticated);

  const [isReadyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    beforeInstallPromptEvent(setIsReadyForInstall)
  }, []);

  
  
  return (
    <>
      <Routes>

      
      {
          auth ? (
              <>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  <Route path="/notes" element={<Notes />} />

                  <Route path="/*" element={<Navigate to="/" />} />
              </>
          )
          : (
              <>
                  <Route path="/" element={<Login />} />
                  <Route path="/*" element={<Navigate to="/" />} />
              </>
              
          )
      }
      </Routes>
      {
        isReadyForInstall && <p onClick={() => downloadApp(setIsReadyForInstall)} style={{
          color: 'white',
          margin: '20px',
          background: 'rgba(255,255,255,.2)',
          padding: '10px',
          textAlign: 'center',
        }}>Instalar</p>
      }
    </>
  )
}
