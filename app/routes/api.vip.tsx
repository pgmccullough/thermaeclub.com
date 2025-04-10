import type { ActionFunctionArgs } from '@remix-run/node'
import { userExists } from '~/util/prisma/controllers/vip.controller'
import { prisma } from '~/util/prisma/db.server'
import { sendEmail } from '~/util/tools/comms/sendEmail'
import { sendSMS } from '~/util/tools/comms/sendSMS'
import { encrypt, hash } from '~/util/tools/encryption/encryption'

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
        { error: 'Secret encryption key is required.' },
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

    const checkForUser = await userExists(prisma, { email, phone })
    if (checkForUser) {
      return Response.json(
        {
          error: 'Thanks for the enthusiasm, but you\'re already a VIP!',
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
          emailHash: email ? hash(email) : undefined,
          phone: phone ? encrypt(phone, CRYPT_SECRET) : undefined,
          phoneHash: phone ? hash(phone) : undefined,
        },
      })

      if (email) {
        try {
          const emailRes = await sendEmail({
            to: email,
            subject: 'Welcome to Thermae\'s VIP List',
            body: 'Thanks for signing up. We will be in touch.',
          })

          console.log('emailRes', emailRes)
        } catch (err) {
          console.error('Error sending email: ', err)
        }
      }

      if (phone) {
        const e164Phone = `+${phone.replace(/\D/g, '')}`
        console.log('sending SMS to ', e164Phone)
        try {
          const smsRes = await sendSMS({
            phoneNumber: e164Phone,
            message:
              'Welcome to Thermae\'s VIP club! We will text you updates when they become available.',
          })
          console.log(smsRes)
        } catch (err) {
          console.error('Error sending SMS: ', err)
        }
      }
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
