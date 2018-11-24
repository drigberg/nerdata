"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const fs_1 = require("fs");
const path = require("path");
const Name_1 = require("./Name");
const errors = require("./errors");
const Place_1 = require("./Place");
const dataDir = path.join(__dirname, "..", "data");
let cache = {};
class Nerdata {
    constructor(opts) {
        this.name = new Name_1.Name([]);
        this.place = new Place_1.Place([]);
        this._universes = [];
        this._allUniverses = fs_1.readdirSync(dataDir)
            .filter(item => path.extname(item) === ".json")
            .map(item => path.basename(item, ".json"));
        if (!opts || lodash_1.isEmpty(opts)) {
            this.setup(this._allUniverses);
            return;
        }
        if (lodash_1.has(opts, "include") && lodash_1.has(opts, "exclude")) {
            throw new Error('Opts cannot have both "exclude" and "include" properties.');
        }
        if (lodash_1.has(opts, "include")) {
            this.setup(this.limitByInclusion(opts.include));
            return;
        }
        this.setup(this.limitByExclusion(opts.exclude));
    }
    static resetCache() {
        cache = {};
    }
    universes() {
        return this._universes;
    }
    allUniverses() {
        return this._allUniverses;
    }
    setup(universes) {
        this._universes = universes;
        this._data = this.getData(universes);
        this.name = new Name_1.Name(this._data);
        this.place = new Place_1.Place(this._data);
    }
    getData(universes) {
        if (this._data) {
            return this._data;
        }
        return lodash_1.reduce(universes, (acc, universe) => {
            acc[universe] = this.loadData(universe);
            return acc;
        }, {});
    }
    loadData(universe) {
        if (cache[universe]) {
            return cache[universe];
        }
        const data = JSON.parse(fs_1.readFileSync(path.join(dataDir, `${universe}.json`)).toString());
        cache[universe] = data;
        return data;
    }
    limitByExclusion(excluded) {
        const toExclude = lodash_1.castArray(excluded).map(item => item.toLowerCase());
        const unavailable = toExclude.filter(key => !this._allUniverses.includes(key));
        if (unavailable.length) {
            throw errors.unsupported(unavailable, this._allUniverses);
        }
        const universes = this._allUniverses.filter(item => !toExclude.includes(item));
        if (!universes.length) {
            throw errors.allExcluded();
        }
        return universes;
    }
    limitByInclusion(included) {
        const toInclude = lodash_1.castArray(included).map(item => item.toLowerCase());
        if (!toInclude.length) {
            throw errors.noneIncluded(this._allUniverses);
        }
        const unavailable = toInclude.filter(key => !this._allUniverses.includes(key));
        if (unavailable.length) {
            throw errors.unsupported(unavailable, this._allUniverses);
        }
        return toInclude;
    }
}
exports.Nerdata = Nerdata;
//# sourceMappingURL=Nerdata.js.map