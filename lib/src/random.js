"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
class Random {
    constructor(randomFn) {
        this.randomFn = randomFn;
    }
    integer(from, to) {
        return Math.floor(this.randomFn() * (to - from)) + from;
    }
    element(items) {
        if (!items.length) {
            throw new Error('Cannot select item from empty array');
        }
        return items[this.integer(0, items.length)];
    }
}
exports.Random = Random;
//# sourceMappingURL=random.js.map