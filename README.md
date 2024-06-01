# flexible-invariant 💪💥

`flexible-invariant` is a flexible alternative to
[tiny-invariant](https://www.npmjs.com/package/tiny-invariant) for building
type-safe invariant functions!

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

invariant(falsyValue, () => `This throws the callback's return value!`)
// Error(`This throws the callback's return value!`)
```

## Throwing Custom Exceptions

### `invariantFactory(exceptionProducer)`

Use the `invariantFactory` function to throw a custom exception.

```ts
// utils.ts
import { invariantFactory } from 'flexible-invariant'

const exceptionProducer = (exceptionData: { severity: string; message: string }) => {
  return new Error(`${exceptionData.severity}: ${exceptionData.message}`)
}

export const invariant: (
  condition: any,
  exceptionData: Parameters<typeof exceptionProducer>[0],
) => asserts condition = invariantFactory(exceptionProducer)


// module.ts
import { invariant } from './utils'

invariant(falsyValue, { severity: 'WARN', message: 'Exception data message' })
// Error('WARN: Exception data message')
```


## Credits

- [tiny-invariant](https://github.com/alexreardon/tiny-invariant)

