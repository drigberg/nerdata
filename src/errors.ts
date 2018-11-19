/*
 * Module
 */

export function unsupportedError(unavailable: string[], available: string[]) {
  return new Error(
    `The following universes are unsupported or misspelled: ${unavailable.join(
      ", ",
    )}. Available universes are: ${available.join(", ")}`,
  );
}
