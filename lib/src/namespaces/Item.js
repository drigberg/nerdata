"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const Namespace_1 = require("../Namespace");
class Item extends Namespace_1.Namespace {
    constructor(data, random) {
        super(data, 'items', random);
        this.any = this.any.bind(this);
        this.weapon = this.weapon.bind(this);
        this.tool = this.tool.bind(this);
        this.vehicle = this.vehicle.bind(this);
    }
    weapon(ctx) {
        return this.random.element(this.getSubset(ctx).filter((item) => item.type === 'weapon')).name;
    }
    tool(ctx) {
        return this.random.element(this.getSubset(ctx).filter((item) => item.type === 'tool')).name;
    }
    vehicle(ctx) {
        return this.random.element(this.getSubset(ctx).filter((item) => item.type === 'vehicle')).name;
    }
    any(ctx) {
        return this.random.element(this.getSubset(ctx)).name;
    }
}
exports.Item = Item;
//# sourceMappingURL=Item.js.map