/*
 * Module dependencies
 */

import { castArray, reduce } from 'lodash'
import * as errors from './errors'
import { Universe } from './interface'
import { NamespaceType } from './namespaces/interface'

/*
 * Module
 */

export class Namespace {
  private data: any
  private universes: () => Universe[]

  constructor(data: any, namespace: NamespaceType) {
    Object.defineProperties(this, {
      data: {
        enumerable: false,
        writable: true,
      },
      universes: {
        enumerable: false,
        writable: true,
      },
    })

    const parsed = this.parseData(data, namespace)
    this.data = () => parsed.data
    this.universes = () => parsed.universes
  }

  public getSubset(ctx?: Universe | Universe[]) {
    if (!ctx || !ctx.length) {
      return this.data()
    }

    const universes: Universe[] = castArray(ctx)

    const unavailable = universes.filter(
      (item) => !this.universes().includes(item),
    )

    if (unavailable.length) {
      throw errors.unloaded(unavailable, this.universes())
    }

    return this.data().filter((item: any) => universes.includes(item.ctx))
  }

  private parseData(data: any, namespace: NamespaceType) {
    return reduce(
      data,
      (acc, universeData, ctx) => {
        acc.data.push(
          ...universeData[namespace].map((ctxNameData: any) => ({
            ...ctxNameData,
            ctx,
          })),
        )

        acc.universes.push(ctx)
        return acc
      },
      {
        data: [],
        universes: [],
      } as any,
    )
  }
}
