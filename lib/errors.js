/*
 * Module
 */

function unsupportedError(unavailable, available) {
  return new Error(
    `The following universes are unsupported or misspelled: ${unavailable.join(
      ", ",
    )}. Available universes are: ${available.join(", ")}`,
  );
}

/*
 * Module exports
 */

module.exports = {
  unsupportedError
}