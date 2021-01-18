/*
 * Module dependencies
 */

import { isValidUniverse } from './validators'
import * as errors from './errors'
import { dataByUniverse } from './data'
import type { Universe, INerdataOpts } from './interface'
import { Items } from './namespaces/Item'
import { Names } from './namespaces/Name'
import { Places } from './namespaces/Place'
import { Quotes } from './namespaces/Quote'
import { Random } from './random'
import { Species } from './namespaces/Species'
import { UNIVERSES, DataOrNullByUniverse } from './interface'

function getEmptyDataByUniverse(): DataOrNullByUniverse {
  return UNIVERSES.reduce((acc, universe) => {
    acc[universe] = null
    return acc
  }, {} as DataOrNullByUniverse)
}

/*
 * Module
 */

export class Nerdata {
  public _random: Random = new Random(Math.random)
  private _data: DataOrNullByUniverse = dataByUniverse
  public _universes: Universe[] = []

  public name: Names = new Names(this._data, new Random(Math.random))
  public item: Items = new Items(this._data, new Random(Math.random))
  public place: Places = new Places(this._data, new Random(Math.random))
  public species: Species = new Species(this._data, new Random(Math.random))
  public quote: Quotes = new Quotes(this._data, new Random(Math.random))

  constructor(opts?: INerdataOpts) {
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
    })

    if (!opts || Object.keys(opts).length === 0) {
      this._setup(UNIVERSES, Math.random)
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

    this._setup(UNIVERSES, randomFn)
  }

  private _setup(universes: Universe[], randomFn: () => number) {
    this._random = new Random(randomFn)
    this._data = this._getData(universes)
    this._universes = universes

    this.name = new Names(this._data, this._random)
    this.place = new Places(this._data, this._random)
    this.item = new Items(this._data, this._random)
    this.species = new Species(this._data, this._random)
    this.quote = new Quotes(this._data, this._random)
  }

  private _getData(universes: Universe[]): DataOrNullByUniverse {
    return universes.reduce(
      (acc, universe) => {
        acc[universe] = dataByUniverse[universe]
        return acc
      },
      getEmptyDataByUniverse(),
    )
  }

  private _limitByExclusion(excluded: string | string[]): Universe[] {
    const toExclude = Array.isArray(excluded) ? excluded : [excluded]

    const invalid = toExclude.filter((key: string) => !isValidUniverse(key))
    if (invalid.length) {
      throw errors.unsupported(invalid, UNIVERSES)
    }

    const universes = UNIVERSES.filter(
      (item: string) => !toExclude.includes(item),
    )

    if (!universes.length) {
      throw errors.allExcluded()
    }

    return universes
  }

  private _limitByInclusion(included: string | string[]): Universe[] {
    const toInclude = Array.isArray(included) ? included : [included]

    const invalid = toInclude.filter((key: string) => !isValidUniverse(key))
    if (invalid.length) {
      throw errors.unsupported(invalid, UNIVERSES)
    }

    if (!toInclude.length) {
      throw errors.noneIncluded(UNIVERSES)
    }

    return toInclude as Universe[]
  }
}
