/*
 * Module dependencies
 */

import {
  castArray,
  has,
  isEmpty,
  reduce,
} from "lodash";

import {
  readdirSync,
  readFileSync,
} from 'fs'

import * as path from 'path'
import { Name } from './Name'
import { unsupportedError } from './errors'
import { IFakerOpts } from './interface'

/*
 * Module variables
 */

const dataDir = path.join(__dirname, '..', 'data')

/*
 * Module
 */

export class NerdFaker {
  public name: Name = new Name([])
  private _allUniverses: string[]
  private _universes: string[] = []
  private _data: any

  constructor(opts?: IFakerOpts) {
    this._allUniverses = readdirSync(dataDir)
      .filter(item => path.extname(item) === '.json')
      .map(item => path.basename(item, '.json'))

    if (!opts || isEmpty(opts)) {
      this.setup(this._allUniverses)
      return;
    }

    if (has(opts, 'include') && has(opts, 'exclude')) {
      throw new Error('Opts cannot have both "exclude" and "include" properties.')
    }

    if (has(opts, 'include')) {
      const toInclude = castArray(opts.include).map(item => item.toLowerCase())

      const unavailable = toInclude.filter(key => !this._allUniverses.includes(key));

      if (unavailable.length) {
        throw unsupportedError(unavailable, this._allUniverses)
      }

      this.setup(toInclude)
      return
    }

    const toExclude = castArray(opts.exclude).map(item => item.toLowerCase())
    const unavailable = toExclude.filter(key => !this._allUniverses.includes(key));

    if (unavailable.length) {
      throw unsupportedError(unavailable, this._allUniverses)
    }

    this.setup(this._allUniverses.filter(item => !toExclude.includes(item)))
  }

  setup(universes: string[]) {
    this._universes = universes
    this._data = this.loadData(universes)
    this.name = new Name(this._data)
  }


  public universes(): string[] {
    return this._universes
  }

  public allUniverses(): string[] {
    return this._allUniverses
  }

  private loadData(universes: string[]): any {
    if (this._data) {
      return this._data
    }

    return reduce(universes, (acc, universe) => {
      acc[universe] = JSON.parse(readFileSync(path.join(dataDir, `${universe}.json`)).toString());
      return acc
    }, {} as any)
  }
}
