import type { ActionFunctionArgs } from '@remix-run/node'
import { prisma } from '~/db.server'

export async function action({ request }: ActionFunctionArgs) {
  const contentType = request.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    const body = await request.json()
    const { firstName, lastName, phone, email } = body

    console.log(firstName, lastName, phone, email)

    if (!firstName || !lastName || (!phone && !email)) {
      return Response.json(
        {
          error:
            'First name, last name, and either phone or email are required.',
        },
        { status: 400 },
      )
    }

    try {
      await prisma.vip.create({
        data: {
          firstName,
          lastName,
          email: email ?? undefined,
          phone: phone ?? undefined,
        },
      })
      return Response.json({ success: true })
    } catch (error) {
      console.error('DB error:', error)
      return Response.json(
        {
          error:
            'There was an issue saving your information. Please try again.',
        },
        { status: 500 },
      )
    }
  }

  return Response.json({ error: 'Unsupported content type' }, { status: 415 })
}
