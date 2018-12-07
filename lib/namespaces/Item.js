"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Namespace_1 = require("../Namespace");
class Item extends Namespace_1.Namespace {
    constructor(data) {
        super(data, "items");
    }
    weapon(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === "weapon")).name;
    }
    tool(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === "tool")).name;
    }
    vehicle(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === "vehicle")).name;
    }
    any(ctx) {
        return lodash_1.sample(this.getSubset(ctx)).name;
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map