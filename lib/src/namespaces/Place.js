"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Place = void 0;
const lodash_1 = require("lodash");
const Namespace_1 = require("../Namespace");
class Place extends Namespace_1.Namespace {
    constructor(data) {
        super(data, 'places');
        this.city = this.city.bind(this);
        this.realm = this.realm.bind(this);
        this.any = this.any.bind(this);
    }
    city(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === 'city')).name;
    }
    realm(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === 'realm')).name;
    }
    any(ctx) {
        return lodash_1.sample(this.getSubset(ctx)).name;
    }
}
exports.Place = Place;
//# sourceMappingURL=Place.js.map