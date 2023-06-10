import { describe, expect, test } from 'vitest'
import { formatDate } from './date-format'

describe('formatDate', () => {
  test('formats date', () => {
    const date = new Date('2020-06-16T00:00:00.000Z')
    expect(formatDate(date)).toBe('06-16')
  })
})
