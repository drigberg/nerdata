# nerdfaker

Testdata from scifi and fantasy, because y'all need it.

## INITIALIZATION

```js
const Nerdfaker = require("nerdfaker");
```

A new instance can be specified with all universes:

```js
const faker = new Nerdfaker();
```

To limit memory usage, you can limit in two ways:

```js
// Inclusive
const faker = new Nerdfaker({
  include: ["dune", "star-wars"],
});
```

```js
// Exclusive
const faker = new Nerdfaker({
  exclude: ["rick-and-morty"],
});
```

## USAGE

Each method will return a random item from all loaded universes if no arguments are given. Universes can be filtered by providing a string or array of strings. Requesting a universe that does not exist or has not been loaded will throw an error.

```js
faker.name.full(); // full name from any loaded universe
faker.name.full("star-wars"); // full name from Star Wars
faker.name.full(["dune", "star-wars"]); // full name from Dune or Star Wars
faker.name.full("fifty-shades-of-grey"); // ERROR: unsupported or unloaded
```
