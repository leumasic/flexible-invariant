/**
 * Factory for creating invariant functions that throw custom exceptions.
 *
 * Takes an `exceptionProducer` function returns the exception to throw.
 *
 * @important Type-annotating the resulting `invariant` function is mandatory
 * because it is an assertion function.
 *
 * @example
 *
 * ```ts
 * const exceptionProducer = (exceptionData: string) => new CustomError(exceptionData)
 * const invariant: (
 *    condition: any,
 *    exceptionData: Parameters<typeof exceptionProducer>[0]
 * ) => asserts condition = invariantFactory(exceptionProducer)
 *
 * invariant(falsyValue, 'Expected condition to be truthy')
 * // CustomError('Expected condition to be truthy')
 * ```
 */
export function invariantFactory<K>(
  exceptionProducer: () => K extends Promise<any> ? never : K,
): (condition: any) => asserts condition
export function invariantFactory<T, K>(
  exceptionProducer: (exceptionData: T) => K extends Promise<any> ? never : K,
): (condition: any, exceptionData: T) => asserts condition
export function invariantFactory<T, K>(
  exceptionProducer: (exceptionData: T) => K extends Promise<any> ? never : K,
): (condition: any, exceptionData: T) => asserts condition {
  return (condition: any, exceptionData: T): asserts condition => {
    if (condition) return

    throw exceptionProducer(exceptionData)
  }
}

const defaultExceptionProducer = (exceptionData?: string | (() => string)) => {
  if (exceptionData == null) return new Error('Invariant error')

  if (typeof exceptionData === 'function') return new Error(exceptionData())

  return new Error(exceptionData)
}

/**
 * Asserts that `condition` is truthy, if it is.
 *
 * Otherwise, throws an `Error` with the `message` field set to
 * - `exceptionData` (or its return value) if it is passed,
 * - `'Invariant error'` if it isn't.
 *
 * @example
 *
 * ```ts
 * const username: string | undefined = 'leumasic'
 * invariant(username, 'Username is required')
 * // type of `username` is narrowed to `string`
 * ```
 */
export const invariant: (
  condition: any,
  exceptionData?: Parameters<typeof defaultExceptionProducer>[0],
) => asserts condition = invariantFactory(defaultExceptionProducer)
