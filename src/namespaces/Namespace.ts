/*
 * Module dependencies
 */

import * as errors from '../errors';
import type { Universe } from '../interface';
import type { Random } from '../random';

/*
 * Module
 */

export class Namespace {
  public random: Random
  public universes: Universe[] = []

  constructor(random: Random) {
    Object.defineProperties(this, {
      random: {
        enumerable: false,
        writable: true,
      },
      data: {
        enumerable: false,
        writable: true,
      },
      universes: {
        enumerable: false,
        writable: true,
      },
    });

    this.random = random;
  }

  public getUniverseSubset(ctx: null | Universe | Universe[]): Universe[] {
    if (ctx === null || !ctx.length) {
      return this.universes;
    }

    const universes: Universe[] = Array.isArray(ctx) ? ctx : [ctx];

    const unavailable = universes.filter(
      (item) => !this.universes.includes(item),
    );

    if (unavailable.length) {
      throw errors.unloaded(unavailable, this.universes);
    }

    return universes;
  }
}
