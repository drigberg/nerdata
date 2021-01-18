"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nerdata = void 0;
const fs_1 = require("fs");
const path = require("path");
const validators_1 = require("./validators");
const errors = require("./errors");
const Item_1 = require("./namespaces/Item");
const Name_1 = require("./namespaces/Name");
const Place_1 = require("./namespaces/Place");
const Quote_1 = require("./namespaces/Quote");
const random_1 = require("./random");
const Species_1 = require("./namespaces/Species");
const interface_1 = require("./interface");
const dataDir = path.join(__dirname, 'data');
function createDataByUniverse() {
    return interface_1.UNIVERSES.reduce((acc, universe) => {
        acc[universe] = null;
        return acc;
    }, {});
}
const cache = createDataByUniverse();
class Nerdata {
    constructor(opts) {
        this._random = new random_1.Random(Math.random);
        this._data = createDataByUniverse();
        this._universes = [];
        this.name = new Name_1.Names(this._data, new random_1.Random(Math.random));
        this.item = new Item_1.Items(this._data, new random_1.Random(Math.random));
        this.place = new Place_1.Places(this._data, new random_1.Random(Math.random));
        this.species = new Species_1.Species(this._data, new random_1.Random(Math.random));
        this.quote = new Quote_1.Quotes(this._data, new random_1.Random(Math.random));
        Object.defineProperties(this, {
            _random: {
                enumerable: false,
                writable: true,
            },
            _data: {
                enumerable: false,
                writable: true,
            },
            _universes: {
                enumerable: false,
                writable: true,
            },
        });
        if (!opts || Object.keys(opts).length === 0) {
            this._setup(interface_1.UNIVERSES, Math.random);
            return;
        }
        const randomFn = opts.randomFn ? opts.randomFn : Math.random;
        if (opts.include && opts.exclude) {
            throw new Error('Opts cannot have both "exclude" and "include" properties.');
        }
        if (opts.include) {
            this._setup(this._limitByInclusion(opts.include), randomFn);
            return;
        }
        if (opts.exclude) {
            this._setup(this._limitByExclusion(opts.exclude), randomFn);
            return;
        }
        this._setup(interface_1.UNIVERSES, randomFn);
    }
    static resetCache() {
        for (const universe of interface_1.UNIVERSES) {
            cache[universe] = null;
        }
    }
    _setup(universes, randomFn) {
        this._random = new random_1.Random(randomFn);
        this._data = this._getData(universes);
        this._universes = universes;
        this.name = new Name_1.Names(this._data, this._random);
        this.place = new Place_1.Places(this._data, this._random);
        this.item = new Item_1.Items(this._data, this._random);
        this.species = new Species_1.Species(this._data, this._random);
        this.quote = new Quote_1.Quotes(this._data, this._random);
    }
    _getData(universes) {
        return universes.reduce((acc, universe) => {
            acc[universe] = this._loadData(universe);
            return acc;
        }, {});
    }
    _loadData(universe) {
        if (universe in cache) {
            const cached = cache[universe];
            if (cached !== null) {
                return cached;
            }
        }
        const data = JSON.parse(fs_1.readFileSync(path.join(dataDir, `${universe}.json`)).toString());
        cache[universe] = data;
        return data;
    }
    _limitByExclusion(excluded) {
        const toExclude = Array.isArray(excluded) ? excluded : [excluded];
        if (!validators_1.isValidUniverseArray(toExclude)) {
            const unavailable = toExclude.filter((key) => !interface_1.UNIVERSES.includes(key));
            throw errors.unsupported(unavailable, interface_1.UNIVERSES);
        }
        const universes = interface_1.UNIVERSES.filter((item) => !toExclude.includes(item));
        if (!universes.length) {
            throw errors.allExcluded();
        }
        return universes;
    }
    _limitByInclusion(included) {
        const toInclude = Array.isArray(included) ? included : [included];
        if (!validators_1.isValidUniverseArray(toInclude)) {
            const unavailable = toInclude.filter((key) => !interface_1.UNIVERSES.includes(key));
            throw errors.unsupported(unavailable, interface_1.UNIVERSES);
        }
        if (!toInclude.length) {
            throw errors.noneIncluded(interface_1.UNIVERSES);
        }
        return toInclude;
    }
}
exports.Nerdata = Nerdata;
//# sourceMappingURL=Nerdata.js.map