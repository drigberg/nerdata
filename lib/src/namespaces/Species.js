"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Species = void 0;
const Namespace_1 = require("./Namespace");
class Species extends Namespace_1.Namespace {
    constructor(data, random) {
        super(random);
        this.data = this.parseData(data);
        this.sentient = this.sentient.bind(this);
        this.nonsentient = this.nonsentient.bind(this);
        this.any = this.any.bind(this);
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
            acc[universe] = universeData.species;
            this.universes.push(universe);
            return acc;
        }, {});
        return parsed;
    }
    getByType(ctx, type) {
        const subset = this.getUniverseSubset(ctx);
        const validItems = subset.reduce((acc, universe) => {
            acc.push(...this.data[universe]);
            return acc;
        }, []);
        if (type === null) {
            return this.random.element(validItems);
        }
        return this.random.element(validItems.filter((item) => item.type === type));
    }
    sentient(ctx) {
        const item = this.getByType(ctx || null, 'sentient');
        return item.name;
    }
    nonsentient(ctx) {
        const item = this.getByType(ctx || null, 'nonsentient');
        return item.name;
    }
    any(ctx) {
        const item = this.getByType(ctx || null, null);
        return item.name;
    }
}
exports.Species = Species;
//# sourceMappingURL=Species.js.map