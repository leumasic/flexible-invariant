# flexible-invariant 💪💥

`flexible-invariant` is a *flexible* alternative to [tiny-invariant](https://www.npmjs.com/package/tiny-invariant)

`flexible-invariant` when ~~flexing~~ flexibility counts!

## Install

```bash
npm install flexible-invariant
```

## Usage

The `invariant` function takes a value and evaluates its truthiness. If the
value is truthy, the function acts as a no-op. Otherwise, it throws an `Error`.

```ts
import { invariant } from 'flexible-invariant'

invariant(truthyValue, 'This should not throw!')

invariant(falsyValue)
// Error('Invariant error')

invariant(falsyValue, 'This will throw!')
// Error('This will throw!')
```

The error message defaults to `Invariant error`, but you can set a different
one by passing a second argument.


### Custom Exception

Use the `invariantFactory` function if you would rather throw something else.

```ts
// utils.ts
import { invariantFactory } from 'flexible-invariant'

class MyCustomError extends Error {
  constructor(message: string) {
    super(`My custom error: ${message}`)
  }
}

const exceptionProducer = (exceptionData?: string) => {
  if (exceptionData == null) return new MyCustomError('Invariant error')

  return new MyCustomError(exceptionData)
}

export const invariant: (
  condition: any,
  exceptionData?: Parameters<typeof exceptionProducer>[0],
) => asserts condition = invariantFactory(exceptionProducer)


// module.ts
import { invariant } from './utils'

invariant(condition, 'Error message for MyCustomError')
// MyCustomError('Error message for MyCustomError')
```

Use the `invariantAsyncFactory` function if you want to create an invariant
function that throws the resolved value of an async exception producer.

```ts
// utils.ts
import { invariantAsyncFactory } from 'flexible-invariant'

const asyncExceptionProducer = async (exceptionData: any) => {
  // await something
  return exception
}

export const asyncInvariant: async (
  condition: any,
  exceptionData: Parameters<typeof asyncExceptionProducer>[0],
) => asserts condition = asyncInvariantFactory(asyncExceptionProducer)


// module.ts
import { asyncInvariant } from './utils'

await asyncInvariant(condition, exceptionData)
```

## Credits

- [tiny-invariant](https://github.com/alexreardon/tiny-invariant)

