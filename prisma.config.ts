import path from 'node:path'
import type { PrismaConfig } from 'prisma'
import dotenv from 'dotenv'

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
dotenv.config({ path: envFile })

export default {
  earlyAccess: true,
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
} satisfies PrismaConfig
