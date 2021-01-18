"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
const Namespace_1 = require("../Namespace");
class Items extends Namespace_1.Namespace {
    constructor(data, random) {
        super(random);
        this.data = this.parseData(data);
        this.weapon = this.weapon.bind(this);
        this.tool = this.tool.bind(this);
        this.vehicle = this.vehicle.bind(this);
        this.any = this.any.bind(this);
    }
    parseData(data) {
        const that = this;
        this.universes = [];
        const parsed = Object.keys(data).reduce((acc, key) => {
            const universe = key;
            const universeData = data[universe];
            if (universeData === null) {
                acc[universe] = [];
                return acc;
            }
            acc[universe] = universeData.items;
            that.universes.push(universe);
            return acc;
        }, {});
        return parsed;
    }
    getByType(ctx, type) {
        const subset = this.getUniverseSubset(ctx);
        const validItems = subset.reduce((acc, universe) => {
            acc.push(...this.data[universe]);
            return acc;
        }, []);
        if (type === null) {
            return this.random.element(validItems);
        }
        return this.random.element(validItems.filter((item) => item.type === type));
    }
    weapon(ctx) {
        const item = this.getByType(ctx || null, 'weapon');
        return item.name;
    }
    tool(ctx) {
        const item = this.getByType(ctx || null, 'tool');
        return item.name;
    }
    vehicle(ctx) {
        const item = this.getByType(ctx || null, 'vehicle');
        return item.name;
    }
    any(ctx) {
        const item = this.getByType(ctx || null, null);
        return item.name;
    }
}
exports.Items = Items;
//# sourceMappingURL=Item.js.map