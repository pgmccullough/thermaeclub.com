import type { PrismaClient } from '@prisma/client'
import { hash } from '~/util/tools/encryption/encryption'
// import { prisma } from '../db.server'

export async function userExists(
  prisma: PrismaClient,
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

// export async function userExists({
//   email,
//   phone,
// }: {
//   email?: string;
//   phone?: string;
// }): Promise<boolean> {
//   if (!email && !phone) return false

//   const conditions = []

//   if (email) {
//     conditions.push({ emailHash: hash(email) })
//   }

//   if (phone) {
//     conditions.push({ phoneHash: hash(phone) })
//   }

//   const vip = await prisma.vip.findFirst({
//     where: {
//       OR: conditions,
//     },
//   })

//   return Boolean(vip)
// }
