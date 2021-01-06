/*
 * Module dependencies
 */

import { Namespace } from '../Namespace'
import type { Random } from '../random'
import type { Universe } from '../interface'

/*
 * Module
 */

export class Item extends Namespace {
  constructor(data: any, random: Random) {
    super(data, 'items', random)

    this.any = this.any.bind(this)
    this.weapon = this.weapon.bind(this)
    this.tool = this.tool.bind(this)
    this.vehicle = this.vehicle.bind(this)
  }

  public weapon(ctx?: Universe | Universe[]) {
    return this.random.element(
      this.getSubset(ctx).filter((item: any) => item.type === 'weapon'),
    ).name
  }

  public tool(ctx?: Universe | Universe[]) {
    return this.random.element(
      this.getSubset(ctx).filter((item: any) => item.type === 'tool'),
    ).name
  }

  public vehicle(ctx?: Universe | Universe[]) {
    return this.random.element(
      this.getSubset(ctx).filter((item: any) => item.type === 'vehicle'),
    ).name
  }

  public any(ctx?: Universe | Universe[]) {
    return this.random.element(this.getSubset(ctx)).name
  }
}
