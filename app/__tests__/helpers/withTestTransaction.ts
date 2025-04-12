import type { PrismaClient } from '@prisma/client'
import { TxClient } from '~/util/prisma/controllers/vip.controller'

export async function withTestTransaction(
  prisma: PrismaClient,
  testFn: (tx: TxClient) => Promise<void>,
) {
  await prisma
    .$transaction(async (tx) => {
      await testFn(tx)
      throw new Error('__ROLLBACK__')
    })
    .catch((err) => {
      if (err.message !== '__ROLLBACK__') throw err
    })
}
