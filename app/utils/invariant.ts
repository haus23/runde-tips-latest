/**
 * Provide a condition and if that condition is falsey, this throws an error
 * with the given message.
 *
 * inspired by invariant from 'tiny-invariant' except will still include the
 * message in production.
 *
 * @example
 * invariant(typeof value === 'string', `value must be a string`)
 *
 * @param condition The condition to check
 * @param message The message to throw
 *
 * @throws {Error} if condition is falsey
 */
export function invariant(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || 'Unexpected falsy invariant assertion');
  }
}
