import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const SPLASH_TEXT = 'Travelogic'
const HOLD_AFTER_TYPE_MS = 900
const FADE_OUT_MS = 700

interface SplashScreenProps {
  onFinish: () => void
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const theme = useTheme()
  const [phase, setPhase] = useState<'fadeIn' | 'visible' | 'fadeOut'>('fadeIn')

  const { displayText, isComplete } = useTypewriter({
    text: SPLASH_TEXT,
    speedMs: 90,
    startDelayMs: 350,
  })

  useEffect(() => {
    const fadeInTimer = window.setTimeout(() => setPhase('visible'), 50)
    return () => window.clearTimeout(fadeInTimer)
  }, [])

  useEffect(() => {
    if (!isComplete) return

    const holdTimer = window.setTimeout(() => setPhase('fadeOut'), HOLD_AFTER_TYPE_MS)
    return () => window.clearTimeout(holdTimer)
  }, [isComplete])

  useEffect(() => {
    if (phase !== 'fadeOut') return

    const finishTimer = window.setTimeout(onFinish, FADE_OUT_MS)
    return () => window.clearTimeout(finishTimer)
  }, [phase, onFinish])

  const overlayOpacity =
    phase === 'fadeIn' ? 0 : phase === 'fadeOut' ? 0 : 1

  return (
    <Box
      aria-hidden={phase === 'fadeOut'}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: (t) => t.zIndex.modal + 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        opacity: overlayOpacity,
        transition: `opacity ${FADE_OUT_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: phase === 'fadeOut' ? 'none' : 'auto',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}22 0%, transparent 70%)`,
          filter: 'blur(2px)',
          animation: 'splashPulse 2.8s ease-in-out infinite',
          '@keyframes splashPulse': {
            '0%, 100%': { transform: 'scale(0.95)', opacity: 0.6 },
            '50%': { transform: 'scale(1.05)', opacity: 1 },
          },
        }}
      />

      <Typography
        component="p"
        variant="h2"
        sx={{
          position: 'relative',
          fontWeight: 700,
          letterSpacing: '0.04em',
          userSelect: 'none',
          fontSize: { xs: '2.25rem', sm: '3rem' },
        }}
      >
        {displayText}
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '0.08em',
            height: '0.9em',
            ml: 0.5,
            verticalAlign: 'baseline',
            bgcolor: 'primary.main',
            animation: isComplete ? 'none' : 'cursorBlink 1s step-end infinite',
            opacity: isComplete ? 0 : 1,
            transition: 'opacity 0.3s ease',
            '@keyframes cursorBlink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 },
            },
          }}
        />
      </Typography>
    </Box>
  )
}
