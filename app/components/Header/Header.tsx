import { useScroll } from '~/util/hooks/useScroll'
import { useWindowSize } from '~/util/hooks/useWindowSize'
import xIcon from './social_icons/x.svg'
import instaIcon from './social_icons/instagram.svg'
import pinterestIcon from './social_icons/pinterest.svg'
import tiktokIcon from './social_icons/tiktok.svg'
import youTubeIcon from './social_icons/youtube.svg'
import styles from './Header.module.css'
import { useEffect, useState } from 'react'

export const Header = () => {
  const scrollPosition = useScroll()
  const [, windowHeight] = useWindowSize()

  const [menuExpanded, setMenuExpanded] = useState<boolean | null>(null)
  const [headerBGOpacity, setHeaderBGOpacity] = useState<number>(0)

  useEffect(() => {
    const opacityCalc = scrollPosition / windowHeight / 10
    setHeaderBGOpacity(
      opacityCalc < 0 ? 0 : opacityCalc > 0.25 ? 0.25 : opacityCalc,
    )
  }, [scrollPosition, setHeaderBGOpacity, windowHeight])

  return (
    <>
      <header
        className={styles.header}
        style={{ backgroundColor: `rgba(0,0,0,${headerBGOpacity})` }}
      >
        <button
          className={styles.menuButton}
          onClick={() => setMenuExpanded((prev) => !prev)}
        >
          <div
            className={`${menuExpanded === null ? styles.menuIcon : menuExpanded ? `${styles.menuIcon} ${styles.menuIconExpanded}` : `${styles.menuIcon} ${styles.menuIconContracted}`}`}
          >
            <div className={`${styles.menuIconLine} ${styles.mil1}`} />
            <div className={`${styles.menuIconLine} ${styles.mil2}`} />
            <div className={`${styles.menuIconLine} ${styles.mil3}`} />
          </div>
          Menu
        </button>
        <div className={styles.socialLinks}>
          <a href="https://x.com/thermaeclub" rel="noreferrer" target="_blank">
            <div className={`${styles.socialIcon} ${styles.socialIconX}`}>
              <img
                src={xIcon}
                alt='X (formerly Twitter) icon, a stylized letter "X" representing the social media platform'
              />
            </div>
          </a>
          <a
            href="https://www.instagram.com/join.thermae"
            rel="noreferrer"
            target="_blank"
          >
            <div className={`${styles.socialIcon}`}>
              <img
                src={instaIcon}
                alt="Instagram icon, a cartoonish outline of an old analog camera with a rainbow gradient"
              />
            </div>
          </a>
          <a
            href="https://www.pinterest.com/thermaeclub/"
            rel="noreferrer"
            target="_blank"
          >
            <div className={`${styles.socialIcon}`}>
              <img
                src={pinterestIcon}
                alt='Pinterest icon, a red "P" in a circular shape, representing the Pinterest platform'
              />
            </div>
          </a>
          <a
            href="https://www.tiktok.com/@thermaeclub"
            rel="noreferrer"
            target="_blank"
          >
            <div className={`${styles.socialIcon}`}>
              <img
                src={tiktokIcon}
                alt="TikTok icon, a musical note with a colorful outline, representing the TikTok platform"
              />
            </div>
          </a>
          <a
            href="https://www.youtube.com/@ThermaeClub"
            rel="noreferrer"
            target="_blank"
          >
            <div className={`${styles.socialIcon}`}>
              <img
                src={youTubeIcon}
                alt="YouTube icon, a red play button inside a white triangle, representing the YouTube platform"
              />
            </div>
          </a>
        </div>
      </header>
      <button
        className={`${menuExpanded === null ? styles.menuBlurOverlay : menuExpanded ? `${styles.menuBlurOverlay} ${styles.menuBlurOverlayOn}` : `${styles.menuBlurOverlay} ${styles.menuBlurOverlayOff}`}`}
        onClick={() => setMenuExpanded(false)}
      />
      <aside
        className={`${menuExpanded === null ? styles.menu : menuExpanded ? `${styles.menu} ${styles.menuExpanded}` : `${styles.menu} ${styles.menuContracted}`}`}
      ></aside>
    </>
  )
}
