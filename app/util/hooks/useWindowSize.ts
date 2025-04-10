import { useState, useEffect } from 'react'

export const useWindowSize = (): [number, number] => {
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [windowHeight, setWindowHeight] = useState<number>(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
      }
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return [windowWidth, windowHeight]
}
