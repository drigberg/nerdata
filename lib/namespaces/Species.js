"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Namespace_1 = require("../Namespace");
class Species extends Namespace_1.Namespace {
    constructor(data) {
        super(data, "species");
    }
    sentient(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === "sentient")).name;
    }
    nonsentient(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === "nonsentient")).name;
    }
    any(ctx) {
        return lodash_1.sample(this.getSubset(ctx)).name;
    }
}
exports.Species = Species;
//# sourceMappingURL=Species.js.map