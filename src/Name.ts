/*
 * Module dependencies
 */

import { castArray, reduce, sample } from "lodash";
import * as errors from "./errors";

/*
 * Module
 */

export class Name {
  private data: any[];
  private universes: string[];
  private subsets: any;

  constructor(data: any) {
    const parsed = this._parseData(data);
    this.data = parsed.data;
    this.universes = parsed.universes;
    this.subsets = {};
  }

  _getSubset(ctx?: string | string[]) {
    if (!ctx || !ctx.length) {
      return this.data;
    }

    const universes = castArray(ctx);
    const hash = universes.sort().join("-");
    if (this.subsets[hash]) {
      return this.subsets[hash];
    }

    const unavailable = universes.filter(
      item => !this.universes.includes(item),
    );
    if (unavailable.length) {
      throw errors.unloaded(unavailable, this.universes);
    }

    const subset = this.data.filter(item => universes.includes(item.ctx));
    this.subsets[hash] = subset;
    return subset;
  }

  first(ctx?: string | string[]) {
    return sample(this._getSubset(ctx)).first;
  }

  last(ctx?: string | string[]) {
    return sample(this._getSubset(ctx).filter((item: any) => item.last)).last;
  }

  full(ctx?: string | string[]) {
    const { first, last } = sample(this._getSubset(ctx));
    return [first, last].filter(item => item).join(" ");
  }

  _parseData(data: any) {
    return reduce(
      data,
      (acc, { names }, ctx) => {
        acc.data.push(
          ...names.map((ctxNameData: any) => ({
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
