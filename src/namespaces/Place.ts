/*
 * Module dependencies
 */

import { sample } from 'lodash'
import { Universe } from '../interface'
import { Namespace } from '../Namespace'

/*
 * Module
 */

export class Place extends Namespace {
  constructor(data: any) {
    super(data, 'places')

    this.city = this.city.bind(this)
    this.planet = this.planet.bind(this)
    this.any = this.any.bind(this)
  }

  public city(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'city'),
    ).name
  }

  public planet(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'planet'),
    ).name
  }

  public any(ctx?: Universe | Universe[]) {
    return sample(this.getSubset(ctx)).name
  }
}
