import { Box } from '@mui/material'
import { useCallback, useState } from 'react'
import App from '../App'
import { SplashScreen } from '../shared/components/SplashScreen'

const SPLASH_SESSION_KEY = 'travelogic-splash-seen'

function readSkipSplash(): boolean {
  try {
    return sessionStorage.getItem(SPLASH_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function AppRoot() {
  const [showSplash, setShowSplash] = useState(() => !readSkipSplash())
  const [contentVisible, setContentVisible] = useState(() => readSkipSplash())

  const handleSplashFinish = useCallback(() => {
    try {
      sessionStorage.setItem(SPLASH_SESSION_KEY, '1')
    } catch {
      // ignore storage errors
    }
    setShowSplash(false)
    requestAnimationFrame(() => setContentVisible(true))
  }, [])

  return (
    <>
      <Box
        sx={{
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? 'none' : 'translateY(8px)',
          transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <App />
      </Box>
      {showSplash ? <SplashScreen onFinish={handleSplashFinish} /> : null}
    </>
  )
}
