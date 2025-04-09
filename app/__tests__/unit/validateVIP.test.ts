import { describe, it, expect } from 'vitest'
import { validateVIPForm } from '~/util/tools/form/validateVIP'

describe('validateVIPForm', () => {
  const base = {
    firstName: 'John',
    lastName: 'Doe',
    phone: '',
    email: '',
  }

  it('fails if firstName is missing', () => {
    const result = validateVIPForm({ ...base, firstName: '' }, 'phone')
    expect(result.formComplete).toBe(false)
    expect(result.errorAt).toContain('firstName')
  })

  it('fails if lastName is missing', () => {
    const result = validateVIPForm({ ...base, lastName: '' }, 'email')
    expect(result.formComplete).toBe(false)
    expect(result.errorAt).toContain('lastName')
  })

  it('fails if phone is selected but missing', () => {
    const result = validateVIPForm({ ...base }, 'phone')
    expect(result.formComplete).toBe(false)
    expect(result.errorAt).toContain('phone')
  })

  it('fails if email is selected but missing', () => {
    const result = validateVIPForm({ ...base }, 'email')
    expect(result.formComplete).toBe(false)
    expect(result.errorAt).toContain('email')
  })

  it('succeeds with valid phone', () => {
    const result = validateVIPForm({ ...base, phone: '1234567890' }, 'phone')
    expect(result.formComplete).toBe(true)
    expect(result.errorAt).toEqual([])
  })

  it('succeeds with valid email', () => {
    const result = validateVIPForm(
      { ...base, email: 'me@example.com' },
      'email',
    )
    expect(result.formComplete).toBe(true)
    expect(result.errorAt).toEqual([])
  })
})
