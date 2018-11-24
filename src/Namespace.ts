/*
 * Module dependencies
 */

import { castArray, reduce } from "lodash";
import * as errors from "./errors";

/*
 * Module
 */

export class Namespace {
  private data: any[];
  private universes: string[];

  constructor(data: any, namespace: string) {
    const parsed = this.parseData(data, namespace);
    this.data = parsed.data;
    this.universes = parsed.universes;
  }

  public getSubset(ctx?: string | string[]) {
    if (!ctx || !ctx.length) {
      return this.data;
    }

    const universes = castArray(ctx);

    const unavailable = universes.filter(
      item => !this.universes.includes(item),
    );

    if (unavailable.length) {
      throw errors.unloaded(unavailable, this.universes);
    }

    return this.data.filter(item => universes.includes(item.ctx));
  }

  private parseData(data: any, namespace: string) {
    return reduce(
      data,
      (acc, universeData, ctx) => {
        acc.data.push(
          ...universeData[namespace].map((ctxNameData: any) => ({
            ...ctxNameData,
            ctx,
          })),
        );

        acc.universes.push(ctx);
        return acc;
      },
      {
        data: [],
        universes: [],
      } as any,
    );
  }
}
