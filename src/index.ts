export function invariantFactory<T, K>(
  exceptionProducer: (exceptionData: T) => K extends Promise<any> ? never : K,
) {
  return (condition: any, exceptionData: T): asserts condition => {
    if (condition) return

    throw exceptionProducer(exceptionData)
  }
}

export const asyncInvariantFactory = <T, K>(
  exceptionProducer: (exceptionData: T) => Promise<K>,
) => {
  return (condition: any, exceptionData: T) => {
    if (condition) return

    throw exceptionProducer(exceptionData)
  }
}

const defaultExceptionProducer = (exceptionData?: string | (() => string)) => {
  if (exceptionData == null) return new Error('Invariant error')

  if (typeof exceptionData === 'function') return new Error(exceptionData())

  return new Error(exceptionData)
}

export const invariant: (
  condition: any,
  exceptionData?: Parameters<typeof defaultExceptionProducer>[0],
) => asserts condition = invariantFactory(defaultExceptionProducer)
