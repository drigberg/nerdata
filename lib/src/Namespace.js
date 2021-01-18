"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
const errors = require("./errors");
class Namespace {
    constructor(random) {
        this.universes = [];
        Object.defineProperties(this, {
            random: {
                enumerable: false,
                writable: true,
            },
            data: {
                enumerable: false,
                writable: true,
            },
            universes: {
                enumerable: false,
                writable: true,
            },
        });
        this.random = random;
    }
    getUniverseSubset(ctx) {
        if (ctx === null || !ctx.length) {
            return this.universes;
        }
        const universes = Array.isArray(ctx) ? ctx : [ctx];
        const unavailable = universes.filter((item) => !this.universes.includes(item));
        if (unavailable.length) {
            throw errors.unloaded(unavailable, this.universes);
        }
        return universes;
    }
}
exports.Namespace = Namespace;
//# sourceMappingURL=Namespace.js.map