import { useState, useEffect } from 'react'

function getWindowDimensions(): { width: number, height: number } {
  const { innerWidth, innerHeight } = window
  return {
    width: innerWidth,
    height: innerHeight,
  }
}

export default function useWindowDimensions(): { width: number, height: number } {
  const [windowDimensions, setWindowDimensions] = useState({width: 0, height: 0})

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions(getWindowDimensions())
    }
    setWindowDimensions(getWindowDimensions())

    window.addEventListener('resize', handleResize)

    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
