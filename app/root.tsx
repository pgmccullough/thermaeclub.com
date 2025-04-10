import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import { Socket } from 'socket.io-client'
import { connect } from './ws.client'
import { wsContext } from './ws.context'
import { useEffect, useState } from 'react'
import '~/styles/style.css'
import { Fathom } from './components/Fathom/Fathom'

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
  },
  {
    rel: 'icon',
    href: '/svg-logo-with-laurel.svg',
    sizes: '32x32',
    type: 'image/svg+xml',
  },
  {
    rel: 'icon',
    href: '/svg-logo-with-laurel.svg',
    sizes: '192x192',
    type: 'image/svg+xml',
  },
  {
    rel: 'apple-touch-icon',
    href: '/svg-logo-with-laurel.svg',
    type: 'image/svg+xmla',
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#102548" />
        <Meta />
        <Links />
      </head>
      <body>
        <Fathom />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const [socket, setSocket] = useState<Socket | undefined>()

  useEffect(() => {
    const connection = connect()
    setSocket(connection as Socket)
    return () => {
      connection.close()
    }
  }, [])

  return (
    <wsContext.Provider value={socket}>
      <Outlet />
    </wsContext.Provider>
  )
}

export async function loader() {
  return Response.json({
    ENV: {
      WS_SERVER_URL: process.env.WS_SERVER_URL,
    },
  })
}
