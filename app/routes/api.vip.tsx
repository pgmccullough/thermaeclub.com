import type { ActionFunctionArgs } from '@remix-run/node'
import { prisma } from '~/db.server'
import { encrypt } from '~/util/tools/encryption/encryption'

const { CRYPT_SECRET } = process.env

export async function action({ request }: ActionFunctionArgs) {
  const contentType = request.headers.get('content-type')

  if (contentType?.includes('application/json')) {
    const body = await request.json()
    const {
      firstName,
      lastName,
      phone,
      email,
    }: { firstName: string; lastName: string; phone: string; email: string } =
      body

    if (!CRYPT_SECRET) {
      return Response.json(
        {
          error: 'Secret encryption key is required.',
        },
        { status: 400 },
      )
    }

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
          firstName: encrypt(firstName, CRYPT_SECRET),
          lastName: encrypt(lastName, CRYPT_SECRET),
          email: email ? encrypt(email, CRYPT_SECRET) : undefined,
          phone: phone ? encrypt(phone, CRYPT_SECRET) : undefined,
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
