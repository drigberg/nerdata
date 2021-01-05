"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namespace = void 0;
const lodash_1 = require("lodash");
const errors = require("./errors");
class Namespace {
    constructor(data, namespace) {
        Object.defineProperties(this, {
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
        this.data = () => parsed.data;
        this.universes = () => parsed.universes;
    }
    getSubset(ctx) {
        if (!ctx || !ctx.length) {
            return this.data();
        }
        const universes = lodash_1.castArray(ctx);
        const unavailable = universes.filter((item) => !this.universes().includes(item));
        if (unavailable.length) {
            throw errors.unloaded(unavailable, this.universes());
        }
        return this.data().filter((item) => universes.includes(item.ctx));
    }
    parseData(data, namespace) {
        return lodash_1.reduce(data, (acc, universeData, ctx) => {
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