"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUniverseArray = exports.isValidUniverse = void 0;
const interface_1 = require("./interface");
const isValidUniverse = (input) => {
    return interface_1.UNIVERSES.includes(input);
};
exports.isValidUniverse = isValidUniverse;
const isValidUniverseArray = (input) => {
    return Array.isArray(input) && input.filter((item) => !exports.isValidUniverse(item)).length === 0;
};
exports.isValidUniverseArray = isValidUniverseArray;
//# sourceMappingURL=validators.js.map