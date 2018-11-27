"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Namespace_1 = require("./Namespace");
class Thing extends Namespace_1.Namespace {
    constructor(data) {
        super(data, "things");
    }
    thing(ctx) {
        return lodash_1.sample(this.getSubset(ctx)).name;
    }
}
exports.Thing = Thing;
//# sourceMappingURL=Thing.js.map