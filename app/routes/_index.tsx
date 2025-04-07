import type { MetaFunction } from '@remix-run/node'
import styles from '~/styles/routes/index.module.css'

export const meta: MetaFunction = () => {
  return [
    { title: 'Thermae | Toiletry Lux for Gentlemen | Coming Soon' },
    {
      name: 'description',
      content:
        'Discover timeless luxury with Thermae—a collection of fine toiletries crafted for the discerning gentleman. Coming soon.',
    },
  ]
}

export default function Index() {
  return (
    <div className={styles.card}>
      <h1>Thermae | Toiletry Lux for Gentlemen | Coming Soon</h1>
      <p>
        Discover timeless luxury with Thermae—a collection of fine toiletries
        crafted for the discerning gentleman.
      </p>
      <p>Coming soon.</p>
      <ul>
        <li>
          <a href="https://x.com/thermaeclub">X: @thermaeclub</a>
        </li>
        <li>
          <a href="https://www.instagram.com/join.thermae">
            Instagram: @join.thermae
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@thermaeclub">TikTok: @thermaeclub</a>
        </li>
        <li>
          <a href="https://www.youtube.com/@ThermaeClub">
            YouTube: @thermaeclub
          </a>
        </li>
        <li>
          <a href="https://www.pinterest.com/thermaeclub/">
            Pinterest: @thermaeclub
          </a>
        </li>
      </ul>
    </div>
  )
}
