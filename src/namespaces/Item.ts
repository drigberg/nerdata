/*
 * Module dependencies
 */

import { Namespace } from './Namespace'
import { Item } from '../interface'
import type { Random } from '../random'
import type { Universe, DataOrNullByUniverse } from '../interface'

/*
 * Module
 */

type ItemsByUniverse = Record<Universe, Item[]>

export class Items extends Namespace {
  public data: ItemsByUniverse

  constructor(data: DataOrNullByUniverse, random: Random) {
    super(random)

    this.data = this.parseData(data)

    this.weapon = this.weapon.bind(this)
    this.tool = this.tool.bind(this)
    this.vehicle = this.vehicle.bind(this)
    this.any = this.any.bind(this)
  }

  private parseData(data: DataOrNullByUniverse): ItemsByUniverse {
    const that = this
    this.universes = [] as Universe[]

    const parsed: ItemsByUniverse = Object.keys(data).reduce((acc, key) => {
      const universe = key as Universe
      const universeData = data[universe]
      if (universeData === null) {
        acc[universe] = [] as Item[]
        return acc
      }

      acc[universe] = universeData.items
      that.universes.push(universe)
      return acc
    }, {} as ItemsByUniverse)
    return parsed
  }

  public getByType(ctx: null | Universe | Universe[], type: string | null): Item {
    const subset = this.getUniverseSubset(ctx)
    const validItems = subset.reduce((acc, universe) => {
      acc.push(...this.data[universe])
      return acc
    }, [] as Item[])

    if (type === null) {
      return this.random.element(validItems)
    }
    return this.random.element(
      validItems.filter((item: Item) => item.type === type),
    )
  }

  public weapon(ctx?: Universe | Universe[]): string {
    const item = this.getByType(ctx || null, 'weapon')
    return item.name
  }

  public tool(ctx?: Universe | Universe[]): string {
    const item = this.getByType(ctx || null, 'tool')
    return item.name
  }

  public vehicle(ctx?: Universe | Universe[]): string {
    const item = this.getByType(ctx || null, 'vehicle')
    return item.name
  }

  public any(ctx?: Universe | Universe[]): string {
    const item = this.getByType(ctx || null, null)
    return item.name
  }
}
