"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Names = void 0;
const Namespace_1 = require("./Namespace");
class Names extends Namespace_1.Namespace {
    constructor(data, random) {
        super(random);
        this.data = this.parseData(data);
        this.first = this.first.bind(this);
        this.last = this.last.bind(this);
        this.full = this.full.bind(this);
    }
    parseData(data) {
        this.universes = [];
        const parsed = Object.keys(data).reduce((acc, key) => {
            const universe = key;
            const universeData = data[universe];
            if (universeData === null) {
                acc[universe] = [];
                return acc;
            }
            acc[universe] = universeData.names;
            this.universes.push(universe);
            return acc;
        }, {});
        return parsed;
    }
    getNamesSubset(ctx) {
        const subset = this.getUniverseSubset(ctx);
        const allNames = subset.reduce((acc, universe) => {
            acc.push(...this.data[universe]);
            return acc;
        }, []);
        return allNames;
    }
    first(ctx) {
        const names = this.getNamesSubset(ctx || null);
        const name = this.random.element(names);
        return name.first;
    }
    last(ctx) {
        const names = this.getNamesSubset(ctx || null).filter((n) => n.last !== undefined);
        const name = this.random.element(names);
        return name.last;
    }
    full(ctx) {
        const names = this.getNamesSubset(ctx || null);
        const { first, last } = this.random.element(names);
        return [first, last].filter((i) => i).join(' ');
    }
}
exports.Names = Names;
//# sourceMappingURL=Name.js.map