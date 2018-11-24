"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Namespace_1 = require("./Namespace");
class Place extends Namespace_1.Namespace {
    constructor(data) {
        super(data, "places");
    }
    place(ctx) {
        return lodash_1.sample(this.getSubset(ctx)).name;
    }
}
exports.Place = Place;
//# sourceMappingURL=Place.js.map