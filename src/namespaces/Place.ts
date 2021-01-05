/*
 * Module dependencies
 */

import { sample } from 'lodash'
import { Namespace } from '../Namespace'
import type { Universe } from '../interface'

/*
 * Module
 */

export class Place extends Namespace {
  constructor(data: any) {
    super(data, 'places')

    this.city = this.city.bind(this)
    this.realm = this.realm.bind(this)
    this.any = this.any.bind(this)
  }

  public city(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'city'),
    ).name
  }

  public realm(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'realm'),
    ).name
  }

  public any(ctx?: Universe | Universe[]) {
    return sample(this.getSubset(ctx)).name
  }
}
