/*
 * Module dependencies
 */

import { sample } from 'lodash'
import { Namespace } from '../Namespace'
import type { Universe } from '../interface'

/*
 * Module
 */

export class Name extends Namespace {
  constructor(data: any) {
    super(data, 'names')

    this.first = this.first.bind(this)
    this.last = this.last.bind(this)
    this.full = this.full.bind(this)
  }

  public first(ctx?: Universe | Universe[]) {
    return sample(this.getSubset(ctx)).first
  }

  public last(ctx?: Universe | Universe[]) {
    return sample(this.getSubset(ctx).filter((item: any) => item.last)).last
  }

  public full(ctx?: Universe | Universe[]) {
    const { first, last } = sample(this.getSubset(ctx))
    return [first, last].filter((item) => item).join(' ')
  }
}
