export const formatPhone = (rawPhone: string) => {
  const digits = rawPhone.replace(/\D/g, '').replace(/^1/, '').slice(0, 10)
  const parts = []

  if (digits.length > 0) parts.push('+1 (')
  parts.push(digits.slice(0, 3))
  if (digits.length >= 4) parts.push(') ')
  if (digits.length >= 4) parts.push(digits.slice(3, 6))
  if (digits.length >= 7) parts.push('-')
  if (digits.length >= 7) parts.push(digits.slice(6, 10))

  return parts.join('')
}
