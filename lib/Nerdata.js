"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const fs_1 = require("fs");
const path = require("path");
const Name_1 = require("./Name");
const errors = require("./errors");
const Place_1 = require("./Place");
const Thing_1 = require("./Thing");
const dataDir = path.join(__dirname, "..", "data");
let cache = {};
class Nerdata {
    constructor(opts) {
        this.name = new Name_1.Name([]);
        this.place = new Place_1.Place([]);
        this.thing = new Thing_1.Thing([]);
        const allUniverses = fs_1.readdirSync(dataDir)
            .filter(item => path.extname(item) === ".json")
            .map(item => path.basename(item, ".json"));
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
    allUniverses() {
        return this._allUniverses;
    }
    _setup(universes) {
        this._universes = () => universes;
        const data = this._getData(universes);
        this._data = () => data;
        this.name = new Name_1.Name(this._data());
        this.place = new Place_1.Place(this._data());
        this.thing = new Thing_1.Thing(this._data());
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
        const toExclude = lodash_1.castArray(excluded).map(item => item.toLowerCase());
        const unavailable = toExclude.filter(key => !this._allUniverses().includes(key));
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
        const toInclude = lodash_1.castArray(included).map(item => item.toLowerCase());
        if (!toInclude.length) {
            throw errors.noneIncluded(this._allUniverses());
        }
        const unavailable = toInclude.filter(key => !this._allUniverses().includes(key));
        if (unavailable.length) {
            throw errors.unsupported(unavailable, this._allUniverses());
        }
        return toInclude;
    }
}
exports.Nerdata = Nerdata;
//# sourceMappingURL=Nerdata.js.map