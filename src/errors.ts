/*
 * Module
 */

function formatAvailable(available: string[]) {
  return available.sort().join(', ');
}

export function unloaded(unavailable: string[], available: string[]): Error {
  return new Error(
    `The following universes were not selected when Nerdata was initialized: ${unavailable
      .sort()
      .join(
        ', ',
      )}. Only the following are currently available: ${formatAvailable(
      available,
    )}`,
  );
}

export function unsupported(unavailable: string[], available: string[]): Error {
  return new Error(
    `The following universes are unsupported or misspelled: ${unavailable
      .sort()
      .join(', ')}. Available universes are: ${formatAvailable(available)}`,
  );
}

export function noneIncluded(available: string[]): Error {
  return new Error(
    `opts.include must have at least one item, if specified. Options are: ${formatAvailable(
      available,
    )}`,
  );
}

export function allExcluded(): Error {
  return new Error('opts.exclude cannot contain all options.');
}
