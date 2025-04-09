import { io } from 'socket.io-client'

const WS_SERVER_URL =
  typeof window !== 'undefined'
    ? window.ENV?.WS_SERVER_URL
    : process.env.WS_SERVER_URL

export function connect() {
  return io(WS_SERVER_URL || 'http://localhost:3000')
}
