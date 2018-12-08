"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatAvailable(available) {
    return available.sort().join(', ');
}
function unloaded(unavailable, available) {
    return new Error(`The following universes were not loaded when Nerdata was initialized: ${unavailable
        .sort()
        .join(', ')}. Only the following are currently available: ${formatAvailable(available)}`);
}
exports.unloaded = unloaded;
function unsupported(unavailable, available) {
    return new Error(`The following universes are unsupported or misspelled: ${unavailable
        .sort()
        .join(', ')}. Available universes are: ${formatAvailable(available)}`);
}
exports.unsupported = unsupported;
function noneIncluded(available) {
    return new Error(`opts.include must have at least one item, if specified. Options are: ${formatAvailable(available)}`);
}
exports.noneIncluded = noneIncluded;
function allExcluded() {
    return new Error('opts.exclude cannot contain all options.');
}
exports.allExcluded = allExcluded;
//# sourceMappingURL=errors.js.map