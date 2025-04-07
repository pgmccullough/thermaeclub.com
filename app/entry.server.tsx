/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import fs from 'fs'
import { PassThrough } from 'node:stream'

import type { AppLoadContext, EntryContext } from '@remix-run/node'
import { createReadableStreamFromReadable } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import path from 'path'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import compression from 'compression'
import morgan from 'morgan'
import { createRequestHandler } from '@remix-run/express'

const MODE = process.env.NODE_ENV
const BUILD_DIR = path.join(process.cwd(), 'server/build')

const app = express()
const httpServer = createServer(app)
export const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  socket.emit('init', 'connected!')
})

app.use(compression())
app.use(express.static('public', { maxAge: '1h' }))
app.use(express.static('public/build', { immutable: true, maxAge: '1y' }))
app.use(morgan('tiny'))

function getBuild() {
  if (MODE === 'production') {
    const buildPath = path.join(BUILD_DIR, 'index.js')
    if (!fs.existsSync(buildPath)) {
      throw new Error(
        'The build directory is missing. Run `npx remix build` to generate it.',
      )
    }
    return require('./build')
  }

  // In development, reload the module each time
  purgeRequireCache()
  return require('./build')
}

// Use the `getBuild` function in your request handler
app.all('*', (req, res, next) => {
  try {
    const build = getBuild()
    return createRequestHandler({ build, mode: MODE })(req, res, next)
  } catch (error) {
    res
      .status(500)
      .send(
        'Server error: Unable to load the build. Did you forget to run `npx remix build`?',
      )
  }
})

const port = process.env.PORT || 3000

httpServer.listen(port, () => {
  console.log(`WS server listening on port ${port}`)
})

async function purgeRequireCache() {
  const cacheKeys = Object.keys(require.cache)
  for (const key of cacheKeys) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key]
    }
  }
}

const ABORT_DELAY = 5_000

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  loadContext: AppLoadContext,
) {
  if (loadContext.null) console.log(loadContext) // calling here to satisfy lefthook
  return isbot(request.headers.get('user-agent') || '')
    ? handleBotRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext,
    )
    : handleBrowserRequest(
      request,
      responseStatusCode,
      responseHeaders,
      remixContext,
    )
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onAllReady() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        context={remixContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        onShellReady() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
