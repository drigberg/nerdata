"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Namespace_1 = require("../Namespace");
class Name extends Namespace_1.Namespace {
    constructor(data) {
        super(data, "names");
        this.first = this.first.bind(this);
        this.last = this.last.bind(this);
        this.full = this.full.bind(this);
    }
    first(ctx) {
        return lodash_1.sample(this.getSubset(ctx)).first;
    }
    last(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.last)).last;
    }
    full(ctx) {
        const { first, last } = lodash_1.sample(this.getSubset(ctx));
        return [first, last].filter(item => item).join(" ");
    }
}
exports.Name = Name;
//# sourceMappingURL=Name.js.map