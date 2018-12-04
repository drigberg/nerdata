"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Namespace_1 = require("./Namespace");
class Item extends Namespace_1.Namespace {
    constructor(data) {
        super(data, "items");
    }
    item(ctx) {
        return lodash_1.sample(this.getSubset(ctx)).name;
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map