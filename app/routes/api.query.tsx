import { ActionFunctionArgs } from '@remix-run/node'
import { io } from '~/entry.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const { q } = await request.json()
  io.emit('message', q)
  return Response.json({ message: q })
}
