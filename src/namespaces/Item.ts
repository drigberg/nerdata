/*
 * Module dependencies
 */

import { sample } from 'lodash'
import { Universe } from '../interface'
import { Namespace } from '../Namespace'

/*
 * Module
 */

export class Item extends Namespace {
  constructor(data: any) {
    super(data, 'items')

    this.any = this.any.bind(this)
    this.weapon = this.weapon.bind(this)
    this.tool = this.tool.bind(this)
    this.vehicle = this.vehicle.bind(this)
  }

  public weapon(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'weapon'),
    ).name
  }

  public tool(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'tool'),
    ).name
  }

  public vehicle(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'vehicle'),
    ).name
  }

  public any(ctx?: Universe | Universe[]) {
    return sample(this.getSubset(ctx)).name
  }
}
