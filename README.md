# nerdata

Testdata from scifi and fantasy, because y'all need it.

## INITIALIZATION

```js
const Nerdata = require("nerdata");
```

A new instance can be specified with all universes:

```js
const nerdata = new Nerdata();
```

To limit memory usage, you can limit in two ways:

```js
// Inclusive
const nerdata = new Nerdata({
  include: ["dune", "star-wars"],
});
```

```js
// Exclusive
const nerdata = new Nerdata({
  exclude: ["rick-and-morty"],
});
```

## USAGE

Each method will return a random item from all loaded universes if no arguments are given. Universes can be filtered by providing a string or array of strings. Requesting a universe that does not exist or has not been loaded will throw an error.

```js
nerdata.name.full(); // full name from any loaded universe
nerdata.name.full("star-wars"); // full name from Star Wars
nerdata.name.full(["dune", "star-wars"]); // full name from Dune or Star Wars
nerdata.name.full("fifty-shades-of-grey"); // ERROR: unsupported or unloaded
```
