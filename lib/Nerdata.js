"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const lodash_1 = require("lodash");
const path = require("path");
const errors = require("./errors");
const Item_1 = require("./namespaces/Item");
const Name_1 = require("./namespaces/Name");
const Place_1 = require("./namespaces/Place");
const Quote_1 = require("./namespaces/Quote");
const Species_1 = require("./namespaces/Species");
const dataDir = path.join(__dirname, "..", "data");
let cache = {};
class Nerdata {
    constructor(opts) {
        this.name = new Name_1.Name([]);
        this.place = new Place_1.Place([]);
        this.item = new Item_1.Item([]);
        this.species = new Species_1.Species([]);
        this.quote = new Quote_1.Quote([]);
        this._universes = () => [];
        Object.defineProperties(this, {
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
            .filter((item) => path.extname(item) === ".json")
            .map((item) => path.basename(item, ".json"));
        this._allUniverses = () => allUniverses;
        if (!opts || lodash_1.isEmpty(opts)) {
            this._setup(this._allUniverses());
            return;
        }
        if (lodash_1.has(opts, "include") && lodash_1.has(opts, "exclude")) {
            throw new Error('Opts cannot have both "exclude" and "include" properties.');
        }
        if (lodash_1.has(opts, "include")) {
            this._setup(this._limitByInclusion(opts.include));
            return;
        }
        this._setup(this._limitByExclusion(opts.exclude));
    }
    static resetCache() {
        cache = {};
    }
    _setup(universes) {
        this._universes = () => universes;
        const data = this._getData(universes);
        this._data = () => data;
        this.name = new Name_1.Name(this._data());
        this.place = new Place_1.Place(this._data());
        this.item = new Item_1.Item(this._data());
        this.species = new Species_1.Species(this._data());
        this.quote = new Quote_1.Quote(this._data());
    }
    _getData(universes) {
        return lodash_1.reduce(universes, (acc, universe) => {
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
        const toExclude = lodash_1.castArray(excluded).map((item) => item.toLowerCase());
        const unavailable = toExclude.filter((key) => !this._allUniverses().includes(key));
        if (unavailable.length) {
            throw errors.unsupported(unavailable, this._allUniverses());
        }
        const universes = this._allUniverses().filter((item) => !toExclude.includes(item));
        if (!universes.length) {
            throw errors.allExcluded();
        }
        return universes;
    }
    _limitByInclusion(included) {
        const toInclude = lodash_1.castArray(included).map((item) => item.toLowerCase());
        if (!toInclude.length) {
            throw errors.noneIncluded(this._allUniverses());
        }
        const unavailable = toInclude.filter((key) => !this._allUniverses().includes(key));
        if (unavailable.length) {
            throw errors.unsupported(unavailable, this._allUniverses());
        }
        return toInclude;
    }
}
exports.Nerdata = Nerdata;
//# sourceMappingURL=Nerdata.js.map