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
const dataDir = path.join(__dirname, 'data');
let cache = {};
class Nerdata {
    constructor(opts) {
        this._random = new random_1.Random(Math.random);
        this.name = new Name_1.Name([], new random_1.Random(Math.random));
        this.item = new Item_1.Item([], new random_1.Random(Math.random));
        this.place = new Place_1.Place([], new random_1.Random(Math.random));
        this.species = new Species_1.Species([], new random_1.Random(Math.random));
        this.quote = new Quote_1.Quote([], new random_1.Random(Math.random));
        this._universes = () => [];
        Object.defineProperties(this, {
            _random: {
                enumerable: false,
                writable: true,
            },
            _allUniverses: {
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
        const allUniverses = fs_1.readdirSync(dataDir)
            .filter((item) => path.extname(item) === '.json')
            .map((item) => path.basename(item, '.json'));
        if (!validators_1.isValidUniverseArray(allUniverses)) {
            throw new Error('Corrupted data: invalid universe in data');
        }
        this._allUniverses = () => allUniverses;
        if (!opts || Object.keys(opts).length === 0) {
            this._setup(this._allUniverses(), Math.random);
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
        this._setup(this._allUniverses(), randomFn);
    }
    static resetCache() {
        cache = {};
    }
    _setup(universes, randomFn) {
        this._random = new random_1.Random(randomFn);
        this._universes = () => universes;
        const data = this._getData(universes);
        this._data = () => data;
        this.name = new Name_1.Name(this._data(), this._random);
        this.place = new Place_1.Place(this._data(), this._random);
        this.item = new Item_1.Item(this._data(), this._random);
        this.species = new Species_1.Species(this._data(), this._random);
        this.quote = new Quote_1.Quote(this._data(), this._random);
    }
    _getData(universes) {
        return universes.reduce((acc, universe) => {
            acc[universe] = this._loadData(universe);
            return acc;
        }, {});
    }
    _loadData(universe) {
        if (cache[universe]) {
            return cache[universe];
        }
        const data = JSON.parse(fs_1.readFileSync(path.join(dataDir, `${universe}.json`)).toString());
        cache[universe] = data;
        return data;
    }
    _limitByExclusion(excluded) {
        const toExclude = Array.isArray(excluded) ? excluded : [excluded];
        if (!validators_1.isValidUniverseArray(toExclude)) {
            const unavailable = toExclude.filter((key) => !this._allUniverses().includes(key));
            throw errors.unsupported(unavailable, this._allUniverses());
        }
        const universes = this._allUniverses().filter((item) => !toExclude.includes(item));
        if (!universes.length) {
            throw errors.allExcluded();
        }
        return universes;
    }
    _limitByInclusion(included) {
        const toInclude = Array.isArray(included) ? included : [included];
        if (!validators_1.isValidUniverseArray(toInclude)) {
            const unavailable = toInclude.filter((key) => !this._allUniverses().includes(key));
            throw errors.unsupported(unavailable, this._allUniverses());
        }
        if (!toInclude.length) {
            throw errors.noneIncluded(this._allUniverses());
        }
        return toInclude;
    }
}
exports.Nerdata = Nerdata;
//# sourceMappingURL=Nerdata.js.map