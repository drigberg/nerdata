/*
 * Module dependencies
 */

import { Namespace } from '../Namespace'
import { Name, NameWithLast } from '../interface'
import type { Random } from '../random'
import type { Universe, DataByUniverse } from '../interface'

/*
 * Module
 */

type NamesByUniverse = Record<Universe, Name[]>
export class Names extends Namespace {
  public data: NamesByUniverse

  constructor(data: DataByUniverse, random: Random) {
    super(random)

    this.data = this.parseData(data)

    this.first = this.first.bind(this)
    this.last = this.last.bind(this)
    this.full = this.full.bind(this)
  }

  private parseData(data: DataByUniverse): NamesByUniverse {
    const that = this
    this.universes = [] as Universe[]

    const parsed: NamesByUniverse = Object.keys(data).reduce((acc, key) => {
      const universe = key as Universe
      const universeData = data[universe]
      if (universeData === null) {
        acc[universe] = [] as Name[]
        return acc
      }

      acc[universe] = universeData.names
      that.universes.push(universe)
      return acc
    }, {} as NamesByUniverse)
    return parsed
  }

  public getNamesSubset(ctx: null | Universe | Universe[]): Name[] {
    const subset = this.getUniverseSubset(ctx)
    const allNames = subset.reduce((acc, universe) => {
      acc.push(...this.data[universe])
      return acc
    }, [] as Name[])
    return allNames
  }

  public first(ctx?: Universe | Universe[]): string {
    const names = this.getNamesSubset(ctx || null)
    const name = this.random.element(names)
    return name.first
  }

  public last(ctx?: Universe | Universe[]): string {
    const names: NameWithLast[] = this.getNamesSubset(ctx || null).filter((n): n is NameWithLast => n.last !== undefined)
    const name = this.random.element(names)
    return name.last
  }

  public full(ctx?: Universe | Universe[]): string {
    const names = this.getNamesSubset(ctx || null)
    const {first, last} = this.random.element(names)
    return [first, last].filter((i) => i).join(' ')
  }
}
