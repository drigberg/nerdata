"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
const errors = require("./errors");
class Namespace {
    constructor(data, namespace, random) {
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
        const parsed = this.parseData(data, namespace);
        this.random = random;
        this.data = () => parsed.data;
        this.universes = () => parsed.universes;
    }
    getSubset(ctx) {
        if (!ctx || !ctx.length) {
            return this.data();
        }
        const universes = Array.isArray(ctx) ? ctx : [ctx];
        const unavailable = universes.filter((item) => !this.universes().includes(item));
        if (unavailable.length) {
            throw errors.unloaded(unavailable, this.universes());
        }
        return this.data().filter((item) => universes.includes(item.ctx));
    }
    parseData(data, namespace) {
        return Object.keys(data).reduce((acc, ctx) => {
            const universeData = data[ctx];
            acc.data.push(...universeData[namespace].map((ctxNameData) => (Object.assign(Object.assign({}, ctxNameData), { ctx }))));
            acc.universes.push(ctx);
            return acc;
        }, {
            data: [],
            universes: [],
        });
    }
}
exports.Namespace = Namespace;
//# sourceMappingURL=Namespace.js.map