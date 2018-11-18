/*
 * Module dependencies
 */

const { castArray, reduce, sample } = require('lodash')
const { unsupportedError } = require('./errors')

/*
 * Module
 */

class Names {
  constructor(data) {
    const parsed = this._parseData(data);
    this.data = parsed.data
    this.universes = parsed.universes
    this.subsets = {}
  }

  _getSubset(ctx) {
    if (!ctx || !ctx.length) {
      return this.data
    }

    const universes = castArray(ctx)
    const hash = universes.sort().join('-')
    if (this.subsets[hash]) {
      return this.subsets[hash]
    }

    const unavailable = universes.filter(item => !this.universes.includes(item))
    if (unavailable.length) {
      throw unsupportedError(unavailable, this.universes)
    }

    const subset = this.data.filter(item => universes.includes(item.ctx))
    this.subsets[hash] = subset
    return subset
  }

  first(ctx) {
    return sample(this._getSubset(ctx)).first
  }

  last(ctx) {
    return sample(this._getSubset(ctx)).last
  }

  full(ctx) {
    const { first, last } = sample(this._getSubset(ctx))
    return [first, last].filter(item => item).join(' ');
  }

  _parseData(data) {
    return reduce(data, (acc, { names }, ctx) => {
      acc.data.push(...names.map(item => ({
        ...item,
        ctx,
      })))

      acc.universes.push(ctx)
      return acc;
    }, {
        data: [],
        universes: [],
      });
  }
}

/*
 * Module exports
 */

module.exports = Names