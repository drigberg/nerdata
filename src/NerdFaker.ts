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
import * as errors from './errors'
import { IFakerOpts } from './interface'

/*
 * Module variables
 */

const dataDir: string = path.join(__dirname, '..', 'data')

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
      this.setup(this.limitByInclusion(opts.include))
      return
    }

    this.setup(this.limitByExclusion(opts.exclude))
  }

  public universes(): string[] {
    return this._universes
  }

  public allUniverses(): string[] {
    return this._allUniverses
  }

  private setup(universes: string[]) {
    this._universes = universes
    this._data = this.loadData(universes)
    this.name = new Name(this._data)
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

  private limitByExclusion(excluded?: string | string[]) {
    const toExclude = castArray(excluded).map(item => item.toLowerCase())
    const unavailable = toExclude.filter(key => !this._allUniverses.includes(key));

    if (unavailable.length) {
      throw errors.unsupported(unavailable, this._allUniverses)
    }

    return this._allUniverses.filter(item => !toExclude.includes(item))
  }

  private limitByInclusion(included?: string | string[]) {
    const toInclude = castArray(included).map(item => item.toLowerCase())

    if (!toInclude.length) {
      throw errors.noneIncluded(this._allUniverses)
    }

    const unavailable = toInclude.filter(key => !this._allUniverses.includes(key));

    if (unavailable.length) {
      throw errors.unsupported(unavailable, this._allUniverses)
    }

    return toInclude
  }
}
