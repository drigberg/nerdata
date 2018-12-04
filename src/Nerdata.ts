/*
 * Module dependencies
 */

import { castArray, has, isEmpty, reduce } from "lodash";

import { readdirSync, readFileSync } from "fs";

import * as path from "path";
import { Name } from "./Name";
import * as errors from "./errors";
import { NerdataOpts } from "./interface";
import { Place } from "./Place";
import { Item } from "./Item";
/*
 * Module variables
 */

const dataDir: string = path.join(__dirname, "..", "data");
let cache: any = {};

/*
 * Module
 */

export class Nerdata {
  public name: Name = new Name([]);
  public place: Place = new Place([]);
  public item: Item = new Item([]);
  public _allUniverses: any;
  public _universes: any;
  private _data: any;

  constructor(opts?: NerdataOpts) {
    const allUniverses = readdirSync(dataDir)
      .filter(item => path.extname(item) === ".json")
      .map(item => path.basename(item, ".json"));

    this._allUniverses = () => allUniverses;

    if (!opts || isEmpty(opts)) {
      this._setup(this._allUniverses());
      return;
    }

    if (has(opts, "include") && has(opts, "exclude")) {
      throw new Error(
        'Opts cannot have both "exclude" and "include" properties.',
      );
    }

    if (has(opts, "include")) {
      this._setup(this._limitByInclusion(opts.include));
      return;
    }

    this._setup(this._limitByExclusion(opts.exclude));
  }

  public static resetCache() {
    cache = {};
  }

  public allUniverses(): string[] {
    return this._allUniverses;
  }

  private _setup(universes: string[]) {
    this._universes = () => universes;
    const data = this._getData(universes);
    this._data = () => data;

    this.name = new Name(this._data());
    this.place = new Place(this._data());
    this.item = new Item(this._data());
  }

  private _getData(universes: string[]): any {
    return reduce(
      universes,
      (acc, universe) => {
        acc[universe] = this._loadData(universe);
        return acc;
      },
      {} as any,
    );
  }

  private _loadData(universe: string) {
    if (cache[universe]) {
      return cache[universe];
    }

    const data = JSON.parse(
      readFileSync(path.join(dataDir, `${universe}.json`)).toString(),
    );

    cache[universe] = data;

    return data;
  }

  private _limitByExclusion(excluded?: string | string[]) {
    const toExclude = castArray(excluded).map(item => item.toLowerCase());
    const unavailable = toExclude.filter(
      key => !this._allUniverses().includes(key),
    );

    if (unavailable.length) {
      throw errors.unsupported(unavailable, this._allUniverses());
    }

    const universes = this._allUniverses().filter(
      (item: any) => !toExclude.includes(item),
    );

    if (!universes.length) {
      throw errors.allExcluded();
    }

    return universes;
  }

  private _limitByInclusion(included?: string | string[]) {
    const toInclude = castArray(included).map(item => item.toLowerCase());

    if (!toInclude.length) {
      throw errors.noneIncluded(this._allUniverses());
    }

    const unavailable = toInclude.filter(
      key => !this._allUniverses().includes(key),
    );

    if (unavailable.length) {
      throw errors.unsupported(unavailable, this._allUniverses());
    }

    return toInclude;
  }
}
