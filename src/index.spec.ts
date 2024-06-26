import { describe, it, expect, vi } from 'vitest'
import { invariant, invariantFactory } from './index'

describe('invariant()', () => {
  describe('when condition is truthy', () => {
    it.each([true, -1, 'flexible', ' ', {}, [], Symbol(), Number.POSITIVE_INFINITY, /regex/])(
      'does not throw',
      (condition) => {
        expect(() => invariant(condition)).not.toThrow()
      },
    )
  })

  describe('when condition is falsy', () => {
    it.each([false, 0, null, undefined, Number.NaN, ''])('throws', (condition) => {
      expect(() => invariant(condition)).toThrow()
    })

    it('throws default exception when exceptionData is not provided', () => {
      expect(() => invariant(false)).toThrow('Invariant error')
    })

    it('throws Error instance with message matching given exceptionData string', () => {
      expect(() => invariant(false, 'My error message')).toThrow(new Error('My error message'))
    })

    it('throws Error instance with message matching return value of exceptionData function', () => {
      expect(() => invariant(false, () => 'My error message')).toThrow(
        new Error('My error message'),
      )
    })
  })
})

describe('invariantFactory()', () => {
  describe('when called with `exceptionProducer` that does not take an argument', () => {
    it('returns an invariant function that throws return value of exception producer', () => {
      const invariantFn: (condition: any) => asserts condition = invariantFactory(
        () => new Error('Custom error message'),
      )

      expect(() => invariantFn(false)).toThrow(new Error('Custom error message'))
    })
  })

  describe('when called with `exceptionProducer` that takes an argument', () => {
    it('returns an invariant function that throws return value of exception producer', () => {
      const exceptionProducerMock = vi.fn(
        (exceptionData: { severity: string; message: string }) =>
          new Error(`${exceptionData.severity}: ${exceptionData.message}`),
      )

      const invariantFn: (
        condition: any,
        exceptionData: Parameters<typeof exceptionProducerMock>[0],
      ) => asserts condition = invariantFactory(exceptionProducerMock)

      const exceptionData = { severity: 'ERROR', message: 'My error message' }
      expect(() => invariantFn(false, exceptionData)).toThrow(new Error('ERROR: My error message'))
      expect(exceptionProducerMock).toHaveBeenCalledWith(exceptionData)
    })
  })
})
