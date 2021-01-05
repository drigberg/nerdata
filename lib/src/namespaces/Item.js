"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const lodash_1 = require("lodash");
const Namespace_1 = require("../Namespace");
class Item extends Namespace_1.Namespace {
    constructor(data) {
        super(data, 'items');
        this.any = this.any.bind(this);
        this.weapon = this.weapon.bind(this);
        this.tool = this.tool.bind(this);
        this.vehicle = this.vehicle.bind(this);
    }
    weapon(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === 'weapon')).name;
    }
    tool(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === 'tool')).name;
    }
    vehicle(ctx) {
        return lodash_1.sample(this.getSubset(ctx).filter((item) => item.type === 'vehicle')).name;
    }
    any(ctx) {
        return lodash_1.sample(this.getSubset(ctx)).name;
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map