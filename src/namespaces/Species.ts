/*
 * Module dependencies
 */

import { Namespace } from '../Namespace'
import type { Random } from '../random'
import type { Universe } from '../interface'

/*
 * Module
 */

export class Species extends Namespace {
  constructor(data: any, random: Random) {
    super(data, 'species', random)
    this.any = this.any.bind(this)
    this.sentient = this.sentient.bind(this)
    this.nonsentient = this.nonsentient.bind(this)

  }

  public sentient(ctx?: Universe | Universe[]) {
    return this.random.element(
      this.getSubset(ctx).filter((item: any) => item.type === 'sentient'),
    ).name
  }

  public nonsentient(ctx?: Universe | Universe[]) {
    return this.random.element(
      this.getSubset(ctx).filter((item: any) => item.type === 'nonsentient'),
    ).name
  }

  public any(ctx?: Universe | Universe[]) {
    return this.random.element(this.getSubset(ctx)).name
  }
}
