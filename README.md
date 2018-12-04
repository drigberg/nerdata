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

## API

**All return values are strings.**

| method              | description                    | examples                                    |
| ------------------- | ------------------------------ | ------------------------------------------- |
| name.first          | first name                     | "Han", "Rick", "Paul"                       |
| name.last           | last name                      | "Solo", "Sanchez", "Atreides"               |
| name.full           | full name                      | "Han Solo", "Rick Sanchez", "Paul Atreides" |
| place.any           | name of location (any type)    | "Ahto City", "Gazorpazorp", "Caladan"       |
| place.city          | name of city                   | "Ahto City", "Seattle", "Bandalong"         |
| place.planet        | name of planet                 | "Tattooine", "Gazorpazorp", "Caladan"       |
| item.any            | name of item (any type)        | "light saber", "space cruiser", "suspensor" |
| item.tool           | name of tool                   | "neural band", "plumbus", "suspensor"       |
| item.weapon         | name of weapon                 | "light saber", "freeze ray", "crysknife"    |
| item.vehicle        | name of vehicle                | "X-Wing", "space cruiser", "ornithopter"    |
| species.any         | name of species (any type)     | "jawa", "splorpian", "sandworm"             |
| species.sentient    | name of sentient species       | "jawa", "human", "tleilaxu"                 |
| species.nonsentient | name of nonsentient species    | "bantha", "fleeb", "sandworm"               |
| quote.sentence      | full sentence with punctuation | "There is no try: only do."                 |
