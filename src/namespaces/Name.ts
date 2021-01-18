/*
 * Module dependencies
 */

import { Namespace } from '../Namespace'
import type { Random } from '../random'
import type { Universe } from '../interface'

/*
 * Module
 */

export class Name extends Namespace {
  constructor(data: any, random: Random) {
    super(data, 'names', random)

    this.first = this.first.bind(this)
    this.last = this.last.bind(this)
    this.full = this.full.bind(this)
  }

  public first(ctx?: Universe | Universe[]): string {
    return this.random.element(this.getSubset(ctx)).first
  }

  public last(ctx?: Universe | Universe[]): string {
    return this.random.element(this.getSubset(ctx).filter((item: any) => item.last)).last
  }

  public full(ctx?: Universe | Universe[]): string {
    const { first, last } = this.random.element(this.getSubset(ctx))
    return [first, last].filter((item) => item).join(' ')
  }
}
