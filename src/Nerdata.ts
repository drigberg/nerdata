/*
 * Module dependencies
 */

import { readdirSync, readFileSync } from 'fs'
import * as path from 'path'
import { isValidUniverseArray } from './validators'
import * as errors from './errors'
import type { Universe } from './interface'
import type { INerdataOpts } from './interface'
import { Item } from './namespaces/Item'
import { Name } from './namespaces/Name'
import { Place } from './namespaces/Place'
import { Quote } from './namespaces/Quote'
import { Random } from './random'
import { Species } from './namespaces/Species'

/*
 * Module variables
 */

const dataDir: string = path.join(__dirname, 'data')
let cache: any = {}

/*
 * Module
 */

export class Nerdata {
  public static resetCache() {
    cache = {}
  }
  public _random: Random = new Random(Math.random)
  public name: Name = new Name([], new Random(Math.random))
  public item: Item = new Item([], new Random(Math.random))
  public place: Place = new Place([], new Random(Math.random))
  public species: Species = new Species([], new Random(Math.random))
  public quote: Quote = new Quote([], new Random(Math.random))

  public _allUniverses: () => Universe[]
  private _data: any

  constructor(opts?: INerdataOpts) {
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
    })

    const allUniverses = readdirSync(dataDir)
      .filter((item) => path.extname(item) === '.json')
      .map((item) => path.basename(item, '.json'))

    if (!isValidUniverseArray(allUniverses)) {
      throw new Error('Corrupted data: invalid universe in data')
    }

    this._allUniverses = () => allUniverses

    if (!opts || Object.keys(opts).length === 0) {
      this._setup(this._allUniverses(), Math.random)
      return
    }

    const randomFn = opts.randomFn ? opts.randomFn : Math.random

    if (opts.include && opts.exclude) {
      throw new Error(
        'Opts cannot have both "exclude" and "include" properties.',
      )
    }

    if (opts.include) {
      this._setup(this._limitByInclusion(opts.include), randomFn)
      return
    }

    if (opts.exclude) {
      this._setup(this._limitByExclusion(opts.exclude), randomFn)
      return
    }

    this._setup(this._allUniverses(), randomFn)

  }
  public _universes: () => Universe[] = () => []

  private _setup(universes: Universe[], randomFn: () => number) {
    this._random = new Random(randomFn)
    this._universes = () => universes
    const data = this._getData(universes)
    this._data = () => data

    this.name = new Name(this._data(), this._random)
    this.place = new Place(this._data(), this._random)
    this.item = new Item(this._data(), this._random)
    this.species = new Species(this._data(), this._random)
    this.quote = new Quote(this._data(), this._random)
  }

  private _getData(universes: Universe[]): any {
    return universes.reduce(
      (acc, universe) => {
        acc[universe] = this._loadData(universe)
        return acc
      },
      {} as any,
    )
  }

  private _loadData(universe: Universe) {
    if (cache[universe]) {
      return cache[universe]
    }

    const data = JSON.parse(
      readFileSync(path.join(dataDir, `${universe}.json`)).toString(),
    )

    cache[universe] = data

    return data
  }

  private _limitByExclusion(excluded: string | string[]): Universe[] {
    const toExclude = Array.isArray(excluded) ? excluded : [excluded]

    if (!isValidUniverseArray(toExclude)) {
      const unavailable = toExclude.filter(
        (key: any) => !this._allUniverses().includes(key),
      )

      throw errors.unsupported(unavailable, this._allUniverses())
    }

    const universes = this._allUniverses().filter(
      (item: any) => !toExclude.includes(item),
    )

    if (!universes.length) {
      throw errors.allExcluded()
    }

    return universes
  }

  private _limitByInclusion(included: string | string[]): Universe[] {
    const toInclude = Array.isArray(included) ? included : [included]

    if (!isValidUniverseArray(toInclude)) {
      const unavailable = toInclude.filter(
        (key: any) => !this._allUniverses().includes(key),
      )

      throw errors.unsupported(unavailable, this._allUniverses())
    }

    if (!toInclude.length) {
      throw errors.noneIncluded(this._allUniverses())
    }

    return toInclude
  }
}
