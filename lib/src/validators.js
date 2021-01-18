"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUniverse = void 0;
const interface_1 = require("./interface");
const isValidUniverse = (input) => {
    return interface_1.UNIVERSES.includes(input);
};
exports.isValidUniverse = isValidUniverse;
//# sourceMappingURL=validators.js.map