import { Static, TSchema } from '@sinclair/typebox'
import { TypeCheck, TypeCompiler } from '@sinclair/typebox/compiler'
import { Format } from '@sinclair/typebox/format'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const compilers = new WeakMap<any, TypeCheck<any>>()

Format.Set('email', (value) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
)

export function check<S extends TSchema>(
  schema: S,
  value: unknown
): value is Static<S> {
  const compiler =
    compilers.get(schema) ||
    compilers.set(schema, TypeCompiler.Compile(schema)).get(schema)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return compiler!.Check(value)
}
