"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
const Namespace_1 = require("../Namespace");
class Place extends Namespace_1.Namespace {
    constructor(data, random) {
        super(data, 'places', random);
        this.city = this.city.bind(this);
        this.realm = this.realm.bind(this);
        this.any = this.any.bind(this);
    }
    city(ctx) {
        return this.random.element(this.getSubset(ctx).filter((item) => item.type === 'city')).name;
    }
    realm(ctx) {
        return this.random.element(this.getSubset(ctx).filter((item) => item.type === 'realm')).name;
    }
    any(ctx) {
        return this.random.element(this.getSubset(ctx)).name;
    }
}
exports.Place = Place;
//# sourceMappingURL=Place.js.map