import { useEffect, useRef, useState } from 'react'

interface UseTypewriterOptions {
  text: string
  speedMs?: number
  startDelayMs?: number
  onComplete?: () => void
}

export function useTypewriter({
  text,
  speedMs = 85,
  startDelayMs = 400,
  onComplete,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const onCompleteRef = useRef(onComplete)

  onCompleteRef.current = onComplete

  useEffect(() => {
    setDisplayText('')
    setIsComplete(false)

    let charIndex = 0
    let intervalId: ReturnType<typeof setInterval> | undefined

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        charIndex += 1
        setDisplayText(text.slice(0, charIndex))

        if (charIndex >= text.length) {
          if (intervalId) window.clearInterval(intervalId)
          setIsComplete(true)
          onCompleteRef.current?.()
        }
      }, speedMs)
    }, startDelayMs)

    return () => {
      window.clearTimeout(startId)
      if (intervalId) window.clearInterval(intervalId)
    }
  }, [text, speedMs, startDelayMs])

  return { displayText, isComplete }
}
