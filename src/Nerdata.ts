/*
 * Module dependencies
 */

import { readdirSync, readFileSync } from 'fs'
import { castArray, has, isEmpty, reduce } from 'lodash'
import * as path from 'path'
import { isValidUniverseArray } from './validators'
import * as errors from './errors'
import type { Universe } from './interface'
import type { INerdataOpts } from './interface'
import { Item } from './namespaces/Item'
import { Name } from './namespaces/Name'
import { Place } from './namespaces/Place'
import { Quote } from './namespaces/Quote'
import { Species } from './namespaces/Species'

/*
 * Module variables
 */

const dataDir: string = path.join(__dirname, '..', 'data')
let cache: any = {}

/*
 * Module
 */

export class Nerdata {
  public static resetCache() {
    cache = {}
  }
  public name: Name = new Name([])
  public item: Item = new Item([])
  public place: Place = new Place([])
  public species: Species = new Species([])
  public quote: Quote = new Quote([])

  public _allUniverses: () => Universe[]
  private _data: any

  constructor(opts?: INerdataOpts) {
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
    })

    const allUniverses = readdirSync(dataDir)
      .filter((item) => path.extname(item) === '.json')
      .map((item) => path.basename(item, '.json'))

    if (!isValidUniverseArray(allUniverses)) {
      throw new Error('Corrupted data: invalid universe in data')
    }

    this._allUniverses = () => allUniverses

    if (!opts || isEmpty(opts)) {
      this._setup(this._allUniverses())
      return
    }

    if (has(opts, 'include') && has(opts, 'exclude')) {
      throw new Error(
        'Opts cannot have both "exclude" and "include" properties.',
      )
    }

    if (has(opts, 'include')) {
      this._setup(this._limitByInclusion(opts.include))
      return
    }

    this._setup(this._limitByExclusion(opts.exclude))
  }
  public _universes: () => Universe[] = () => []

  private _setup(universes: Universe[]) {
    this._universes = () => universes
    const data = this._getData(universes)
    this._data = () => data

    this.name = new Name(this._data())
    this.place = new Place(this._data())
    this.item = new Item(this._data())
    this.species = new Species(this._data())
    this.quote = new Quote(this._data())
  }

  private _getData(universes: Universe[]): any {
    return reduce(
      universes,
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

  private _limitByExclusion(excluded?: string | string[]): Universe[] {
    const toExclude = castArray(excluded)

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

  private _limitByInclusion(included?: string | string[]): Universe[] {
    const toInclude = castArray(included)

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
