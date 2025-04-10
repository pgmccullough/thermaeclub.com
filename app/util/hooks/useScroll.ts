import { useState, useEffect } from 'react'

export const useScroll = (): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  const handleScroll = (): void => {
    setScrollPosition(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrollPosition
}
