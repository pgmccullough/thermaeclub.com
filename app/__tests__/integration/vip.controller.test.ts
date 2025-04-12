import { describe, it, expect } from 'vitest'
import { PrismaClient } from '@prisma/client'
import { hash } from '~/util/tools/encryption/encryption'
import { userExists, createVIP } from '~/util/prisma/controllers/vip.controller'
import { withTestTransaction } from '../helpers/withTestTransaction'

const prisma = new PrismaClient()

const CRYPT_SECRET = process.env.CRYPT_SECRET || 'test_secret'
const firstName = 'John'
const lastName = 'Doe'
const email = 'gentleman@thermae.club'
const phone = '555-555-5555'

describe('VIP Controller', () => {
  it('userExists returns true if user with email exists', async () => {
    await withTestTransaction(prisma, async (tx) => {
      await tx.vip.create({
        data: {
          firstName: 'Encrypted',
          lastName: 'Man',
          email: 'hidden',
          emailHash: hash(email),
          phone: null,
          phoneHash: null,
        },
      })

      const result = await userExists(tx, { email })
      expect(result).toBe(true)
    })
  })

  it('userExists returns false if no match', async () => {
    await withTestTransaction(prisma, async (tx) => {
      const result = await userExists(tx, { email: 'notfound@thermae.club' })
      expect(result).toBe(false)
    })
  })

  it('createVIP creates a record with email', async () => {
    await withTestTransaction(prisma, async (tx) => {
      const vip = await createVIP(tx, {
        firstName,
        lastName,
        email,
        CRYPT_SECRET,
      })

      expect(vip).toBeTruthy()
      expect(vip.email).toBeDefined()
      expect(vip.emailHash).toBe(hash(email))
      expect(vip.phone).toBeNull()
    })
  })

  it('createVIP creates a record with phone', async () => {
    await withTestTransaction(prisma, async (tx) => {
      const vip = await createVIP(tx, {
        firstName,
        lastName,
        phone,
        CRYPT_SECRET,
      })

      expect(vip).toBeTruthy()
      expect(vip.phone).toBeDefined()
      expect(vip.phoneHash).toBe(hash(phone))
      expect(vip.email).toBeNull()
    })
  })

  it('createVIP throws if duplicate email hash', async () => {
    await withTestTransaction(prisma, async (tx) => {
      await createVIP(tx, {
        firstName,
        lastName,
        email,
        CRYPT_SECRET,
      })

      let errorCaught = false
      try {
        await createVIP(tx, {
          firstName: 'Jane',
          lastName: 'Smith',
          email,
          CRYPT_SECRET,
        })
      } catch {
        errorCaught = true
      }

      expect(errorCaught).toBe(true)
    })
  })
})
