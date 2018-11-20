/*
 * Module
 */


function formatAvailable(available: string[]) {
  return available.sort().join(', ')
}

export function unsupported(unavailable: string[], available: string[]) {
  return new Error(
    `The following universes are unsupported or misspelled: ${unavailable.sort().join(
      ", ",
    )}. Available universes are: ${formatAvailable(available)}`,
  );
}

export function noneIncluded(available: string[]) {
  return new Error(`opts.include must have at least one item, if specified. Options are: ${formatAvailable(available)}`)
}

export function allExcluded(available: string[]) {
  return new Error(`opts.include must have at least one item, if specified. Options are: ${formatAvailable(available)}`)
}
