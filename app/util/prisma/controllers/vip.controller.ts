import type { PrismaClient } from '@prisma/client'
import { encrypt, hash } from '~/util/tools/encryption/encryption'

export type TxClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export type CreateVIPArgs = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  CRYPT_SECRET: string;
};

export async function userExists(
  prisma: TxClient,
  {
    email,
    phone,
  }: {
    email?: string;
    phone?: string;
  },
): Promise<boolean> {
  if (!email && !phone) return false

  const conditions = []

  if (email) {
    conditions.push({ emailHash: hash(email) })
  }

  if (phone) {
    conditions.push({ phoneHash: hash(phone) })
  }

  const vip = await prisma.vip.findFirst({
    where: {
      OR: conditions,
    },
  })

  return Boolean(vip)
}

export async function createVIP(prisma: TxClient, args: CreateVIPArgs) {
  const { firstName, lastName, email, phone, CRYPT_SECRET } = args

  return prisma.vip.create({
    data: {
      firstName: encrypt(firstName, CRYPT_SECRET),
      lastName: encrypt(lastName, CRYPT_SECRET),
      email: email ? encrypt(email, CRYPT_SECRET) : undefined,
      emailHash: email ? hash(email) : undefined,
      phone: phone ? encrypt(phone, CRYPT_SECRET) : undefined,
      phoneHash: phone ? hash(phone) : undefined,
    },
  })
}
