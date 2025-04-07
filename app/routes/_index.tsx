import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'Thermae | Toiletry Lux for Gentlemen | Coming Soon' },
    { name: 'description', content: 'Discover timeless luxury with Thermae—a collection of fine toiletries crafted for the discerning gentleman. Coming soon.' }
  ]
}


export default function Index() {
  return (
    <div>
      <h1>Thermae | Toiletry Lux for Gentlemen | Coming Soon</h1>
      <p>Discover timeless luxury with Thermae—a collection of fine toiletries crafted for the discerning gentleman.</p>
      <p>Coming soon.</p>
      <ul>
        <li><a href='https://x.com/thermaeclub'>X: @thermaeclub</a></li>
        <li><a href='https://www.instagram.com/join.thermae'>Instagram: @join.thermae</a></li>
      </ul>
    </div>
  )
}
