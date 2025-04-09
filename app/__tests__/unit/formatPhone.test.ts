import { describe, expect, it } from 'vitest'
import { formatPhone } from '~/util/tools/form/formatPhone'

describe('formatPhone', () => {
  it('formats partial and complete phone numbers correctly', () => {
    const tests: [string, string][] = [
      ['', ''],
      ['1', ''],
      ['2', '+1 (2'],
      ['21', '+1 (21'],
      ['212', '+1 (212'],
      ['2121', '+1 (212) 1'],
      ['21212', '+1 (212) 12'],
      ['212123', '+1 (212) 123'],
      ['2121234', '+1 (212) 123-4'],
      ['21212345', '+1 (212) 123-45'],
      ['212123456', '+1 (212) 123-456'],
      ['2121234567', '+1 (212) 123-4567'],
      ['21212345678', '+1 (212) 123-4567'],
      ['212123456789', '+1 (212) 123-4567'],
      ['abc212', '+1 (212'],
      ['1-800-555', '+1 (800) 555'],
    ]

    for (const [input, expected] of tests) {
      expect(formatPhone(input)).toBe(expected)
    }
  })
})
