/*
 * Module dependencies
 */

import { Namespace } from '../Namespace'
import type { Random } from '../random'
import type { Universe } from '../interface'

/*
 * Module
 */

export class Place extends Namespace {
  constructor(data: any, random: Random) {
    super(data, 'places', random)

    this.city = this.city.bind(this)
    this.realm = this.realm.bind(this)
    this.any = this.any.bind(this)
  }

  public city(ctx?: Universe | Universe[]): string {
    return this.random.element(
      this.getSubset(ctx).filter((item: any) => item.type === 'city'),
    ).name
  }

  public realm(ctx?: Universe | Universe[]): string {
    return this.random.element(
      this.getSubset(ctx).filter((item: any) => item.type === 'realm'),
    ).name
  }

  public any(ctx?: Universe | Universe[]): string {
    return this.random.element(this.getSubset(ctx)).name
  }
}
