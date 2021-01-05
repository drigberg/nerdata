"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUniverseArray = exports.isValidUniverse = void 0;
const isValidUniverse = (input) => {
    return ['dune', 'lord-of-the-rings', 'rick-and-morty', 'star-wars'].includes(input);
};
exports.isValidUniverse = isValidUniverse;
const isValidUniverseArray = (input) => {
    return Array.isArray(input) && input.filter((item) => !exports.isValidUniverse(item)).length === 0;
};
exports.isValidUniverseArray = isValidUniverseArray;
//# sourceMappingURL=validators.js.map