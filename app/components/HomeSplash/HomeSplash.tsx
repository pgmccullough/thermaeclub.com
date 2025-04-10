import { useScroll } from '~/util/hooks/useScroll'
import { useWindowSize } from '~/util/hooks/useWindowSize'
import styles from './HomeSplash.module.css'
import { useEffect, useState } from 'react'

export const HomeSplash = () => {
  const scrollPosition = useScroll()
  const [, windowHeight] = useWindowSize()

  const [overlayOpacity, setOverlayOpacity] = useState<number>(1)

  useEffect(() => {
    const opacityCalc = 1 - (scrollPosition / windowHeight) * 3
    setOverlayOpacity(opacityCalc < 0 ? 0 : opacityCalc)
  }, [scrollPosition, setOverlayOpacity, windowHeight])

  return (
    <div className={styles.homeSplash}>
      <div className={styles.overlay} style={{ opacity: overlayOpacity || 0 }}>
        <div className={styles.logo}>
          <img
            src="full-logo-with-text-white.svg"
            alt="The letter T inside of a crest inside of a laurel beside the word Thermae"
          />
        </div>
      </div>
    </div>
  )
}
