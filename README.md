# nerdata

Testdata from scifi and fantasy, because y'all need it.

## DATA

Supported universes:

- Lord of the Rings
- Star Wars
- Rick and Morty
- Dune
- Naruto

Planned universes:

- Doctor Who
- Game of Thrones

## INITIALIZATION

```js
const { Nerdata } = require("nerdata");
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

Call signature: `nerdata.namespace.method([universes], [options])`

Each method will return a random item from all loaded universes if no arguments are given. Universes can be filtered by providing a string or array of strings. Requesting a universe that does not exist or has not been loaded will throw an error.

Options may be provided for certain methods as an object.

```js
nerdata.name.full(); // full name from any loaded universe
nerdata.name.full("star-wars"); // full name from Star Wars
nerdata.name.full(["dune", "star-wars"]); // full name from Dune or Star Wars
nerdata.name.full("fifty-shades-of-grey"); // ERROR: unsupported or unloaded
```

## API

**All return values are strings.**

| method              | description                         | examples                                      |
| ------------------- | ----------------------------------- | --------------------------------------------- |
| name.first          | first name                          | "Han", "Aragorn", "Paul"                      |
| name.last           | last name                           | "Solo", "Sanchez", "Atreides"                 |
| name.full           | full name                           | "Han Solo", "Rick Sanchez", "Frodo Baggins"   |
| place.any           | name of location (any type)         | "Ahto City", "Gazorpazorp", "Caladan"         |
| place.city          | name of city                        | "Ahto City", "Seattle", "Bandalong"           |
| place.realm         | name of realm                       | "Tattooine", "Gazorpazorp", "Gondor"          |
| item.any            | name of item (any type)             | "light saber", "space cruiser", "suspensor"   |
| item.tool           | name of tool                        | "neural band", "plumbus", "suspensor"         |
| item.weapon         | name of weapon                      | "Narsil", "freeze ray", "crysknife"           |
| item.vehicle        | name of vehicle                     | "X-Wing", "space cruiser", "ornithopter"      |
| species.any         | name of species (any type)          | "jawa", "splorpian", "sandworm"               |
| species.sentient    | name of sentient species            | "jawa", "human", "tleilaxu"                   |
| species.nonsentient | name of nonsentient species         | "bantha", "fleeb", "sandworm"                 |
| quote.sentence      | full sentence with punctuation      | "There is no try: only do."                   |
| quote.paragraph     | multiple sentences with punctuation | "There is no try: only do. You pass butter. " |

### OPTIONS

#### quote.sentence: opts.citation

- `citation`: if true, appends speaker to quote
  - true: `"It's a trap!" - Admiral Ackbar`
  - false: `It's a trap!`

```js
nerdata.quote.sentence("rick-and-morty", { citation: true }); // '"I made the bomb, Morty." - Rick Sanchez'
nerdata.quote.sentence("rick-and-morty", { citation: false }); // 'I made the bomb, Morty.'
nerdata.quote.sentence("rick-and-morty"); // 'I made the bomb, Morty.'
```

#### quote.paragraph: opts.sentences

- `sentences`: number of sentences in paragraph
  - default: `3`

```js
nerdata.quote.paragraph("rick-and-morty", { sentences: 1 }); // 'I made the bomb, Morty.'
nerdata.quote.paragraph("rick-and-morty"); // 'I made the bomb, Morty. You pass butter. I mean, why would a Pop-Tart want to live inside a toaster, Rick?'
```

### BUILDING

To build, run `npm run compile`. This first compiles the Typescript code and then auto-generates Flow definitions. Some magic is done here to add `// @flow`, and the generator can make mistakes, so be sure to run `npm run check-flow` to be sure everything worked.

## CONTRIBUTING

I don't have a system in place yet for managing pull requests -- shoot me a message at daniel.rigberg@gmail.com, and let's talk!
