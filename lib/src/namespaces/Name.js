"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Name = void 0;
const Namespace_1 = require("../Namespace");
class Name extends Namespace_1.Namespace {
    constructor(data, random) {
        super(data, 'names', random);
        this.first = this.first.bind(this);
        this.last = this.last.bind(this);
        this.full = this.full.bind(this);
    }
    first(ctx) {
        return this.random.element(this.getSubset(ctx)).first;
    }
    last(ctx) {
        return this.random.element(this.getSubset(ctx).filter((item) => item.last)).last;
    }
    full(ctx) {
        const { first, last } = this.random.element(this.getSubset(ctx));
        return [first, last].filter((item) => item).join(' ');
    }
}
exports.Name = Name;
//# sourceMappingURL=Name.js.map