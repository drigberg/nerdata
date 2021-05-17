"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Places = void 0;
const Namespace_1 = require("./Namespace");
class Places extends Namespace_1.Namespace {
    constructor(data, random) {
        super(random);
        this.data = this.parseData(data);
        this.city = this.city.bind(this);
        this.realm = this.realm.bind(this);
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
            acc[universe] = universeData.places;
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
        return this.random.element(validItems.filter((place) => place.type === type));
    }
    city(ctx) {
        const place = this.getByType(ctx || null, 'city');
        return place.name;
    }
    realm(ctx) {
        const place = this.getByType(ctx || null, 'realm');
        return place.name;
    }
    any(ctx) {
        const place = this.getByType(ctx || null, null);
        return place.name;
    }
}
exports.Places = Places;
//# sourceMappingURL=Place.js.map