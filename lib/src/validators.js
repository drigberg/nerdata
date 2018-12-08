"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUniverse = (input) => {
    return ['dune', 'lord-of-the-rings', 'rick-and-morty', 'star-wars'].includes(input);
};
exports.isValidUniverseArray = (input) => {
    return Array.isArray(input) && input.filter((item) => !exports.isValidUniverse(item)).length === 0;
};
//# sourceMappingURL=validators.js.map