import crypto from 'crypto'

const algorithm = 'aes-256-gcm'

export function hash(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex')
}

export function encrypt(text: string, secret: string): string {
  if (!secret) {
    throw new Error('Cannot encrypt without secret key')
  }

  if (!text) {
    throw new Error('Cannot encrypt undefined or empty string')
  }

  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv(
    'aes-256-gcm',
    Buffer.from(secret, 'hex'),
    iv,
  )
  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ])
  const tag = cipher.getAuthTag()

  return [
    iv.toString('hex'),
    tag.toString('hex'),
    encrypted.toString('hex'),
  ].join(':')
}

export function decrypt(data: string, secret: string): string {
  if (!data || !data.includes(':')) return ''
  const [ivHex, tagHex, encryptedHex] = data.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const tag = Buffer.from(tagHex, 'hex')
  const encrypted = Buffer.from(encryptedHex, 'hex')
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(secret, 'hex'),
    iv,
  )
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ])
  return decrypted.toString('utf8')
}
