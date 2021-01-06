"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Species = void 0;
const Namespace_1 = require("../Namespace");
class Species extends Namespace_1.Namespace {
    constructor(data, random) {
        super(data, 'species', random);
        this.any = this.any.bind(this);
        this.sentient = this.sentient.bind(this);
        this.nonsentient = this.nonsentient.bind(this);
    }
    sentient(ctx) {
        return this.random.element(this.getSubset(ctx).filter((item) => item.type === 'sentient')).name;
    }
    nonsentient(ctx) {
        return this.random.element(this.getSubset(ctx).filter((item) => item.type === 'nonsentient')).name;
    }
    any(ctx) {
        return this.random.element(this.getSubset(ctx)).name;
    }
}
exports.Species = Species;
//# sourceMappingURL=Species.js.map