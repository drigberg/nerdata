/*
 * Module dependencies
 */

import { sample } from 'lodash'
import { Namespace } from '../Namespace'
import type { Universe } from '../interface'

/*
 * Module
 */

export class Species extends Namespace {
  constructor(data: any) {
    super(data, 'species')
    this.any = this.any.bind(this)
    this.sentient = this.sentient.bind(this)
    this.nonsentient = this.nonsentient.bind(this)

  }

  public sentient(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'sentient'),
    ).name
  }

  public nonsentient(ctx?: Universe | Universe[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === 'nonsentient'),
    ).name
  }

  public any(ctx?: Universe | Universe[]) {
    return sample(this.getSubset(ctx)).name
  }
}
