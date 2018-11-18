/*
 * Module dependencies
 */

const {
  castArray,
  reduce,
} = require("lodash");

const Names = require('./lib/Names')
const { unsupportedError } = require('./lib/errors')

/*
 * Module
 */

const DATA = {
  "star-wars": {
    names: [
      {
        first: "Anakin",
        last: "Skywalker",
      },
      {
        first: "Han",
        last: "Solo",
      },
      {
        first: "Leia",
        last: "Organa",
      },
    ],
  },
  dune: {
    names: [
      {
        first: "Paul",
        last: "Atreides",
      },
      {
        first: "Gurney",
        last: "Halleck",
      },
      {
        first: "Duncan",
        last: "Idaho",
      },
    ],
  },
  "rick-and-morty": {
    names: [
      {
        first: "Rick",
        last: "Sanchez",
      },
      {
        first: "Jerry",
        last: "Smith",
      },
      {
        first: "Mister",
        last: "Meeseeks",
      },
      {
        first: "Scary",
        last: "Terry",
      },
      {
        first: "Xenon",
        last: "Bloom",
      },
      {
        first: "Abradolf",
        last: "Lincler",
      },
    ],
  },
};

class Faker {
  constructor(universes) {
    if (!universes || !universes.length) {
      this.names = new Names(DATA);
      return;
    }

    const available = Object.keys(DATA);
    const ctx = castArray(universes)
    const unavailable = ctx.filter(key => !available.includes(key));

    if (unavailable.length) {
      throw unsupportedError(unavailable, available)
    }

    this.names = new Names(reduce(ctx, (acc, universe) => {
      acc[universe] = DATA[universe];
      return acc
    }, {}))
  }
}

/*
 * Module exports
 */

module.exports = Faker