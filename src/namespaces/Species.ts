/*
 * Module dependencies
 */

import { Namespace } from './Namespace'
import { Species as ISpecies } from '../interface'
import type { Random } from '../random'
import type { Universe, DataOrNullByUniverse } from '../interface'

/*
 * Module
 */

type SpeciesByUniverse = Record<Universe, ISpecies[]>

export class Species extends Namespace {
  public data: SpeciesByUniverse

  constructor(data: DataOrNullByUniverse, random: Random) {
    super(random)

    this.data = this.parseData(data)

    this.sentient = this.sentient.bind(this)
    this.nonsentient = this.nonsentient.bind(this)
    this.any = this.any.bind(this)
  }

  private parseData(data: DataOrNullByUniverse): SpeciesByUniverse {
    const that = this
    this.universes = [] as Universe[]

    const parsed: SpeciesByUniverse = Object.keys(data).reduce((acc, key) => {
      const universe = key as Universe
      const universeData = data[universe]
      if (universeData === null) {
        acc[universe] = [] as ISpecies[]
        return acc
      }

      acc[universe] = universeData.species
      that.universes.push(universe)
      return acc
    }, {} as SpeciesByUniverse)
    return parsed
  }

  public getByType(ctx: null | Universe | Universe[], type: string | null): ISpecies {
    const subset = this.getUniverseSubset(ctx)
    const validItems = subset.reduce((acc, universe) => {
      acc.push(...this.data[universe])
      return acc
    }, [] as ISpecies[])

    if (type === null) {
      return this.random.element(validItems)
    }
    return this.random.element(
      validItems.filter((item: ISpecies) => item.type === type),
    )
  }

  public sentient(ctx?: Universe | Universe[]): string {
    const item = this.getByType(ctx || null, 'sentient')
    return item.name
  }

  public nonsentient(ctx?: Universe | Universe[]): string {
    const item = this.getByType(ctx || null, 'nonsentient')
    return item.name
  }

  public any(ctx?: Universe | Universe[]): string {
    const item = this.getByType(ctx || null, null)
    return item.name
  }
}

