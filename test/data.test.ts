import * as Joi from 'joi'
import { readdirSync, readFileSync } from "fs";
import * as path from "path";

describe('data validation', () => {
  const dataDir = path.join(__dirname, "..", "data")

  const name = Joi.object().keys({
    first: Joi.string().min(1).required(),
    last: Joi.string()
  })

  const quote = Joi.object().keys({
    text: Joi.string().min(1).required(),
    speaker: Joi.string().min(1).required()
  })

  const item = Joi.object().keys({
    name: Joi.string().min(1).required(),
    type: Joi.string().regex(/^(weapon|tool|vehicle)$/).required()
  })

  const place = Joi.object().keys({
    name: Joi.string().min(1).required(),
    type: Joi.string().regex(/^(city|planet)$/).required()
  })

  const species = Joi.object().keys({
    name: Joi.string().min(1).required(),
    type: Joi.string().regex(/^(sentient|nonsentient)$/).required()
  })

  const schema = Joi.object().keys({
    items: Joi.array().min(1).items(item),
    places: Joi.array().min(1).items(place),
    names: Joi.array().min(1).items(name),
    quotes: Joi.array().min(1).items(quote),
    species: Joi.array().min(1).items(species),
  })

  const universes = readdirSync(dataDir)
    .filter(item => path.extname(item) === ".json")
    .map(item => path.basename(item, ".json"))

  universes.forEach((universe) => {
    it(`${universe}.json`, () => {
      let data
      try {
        data = JSON.parse(readFileSync(path.join(dataDir, `${universe}.json`)).toString())
      } catch (err) {
        throw new Error(`Invalid json for ${universe}`)
      }

      const { error } = Joi.validate(data, schema);

      if (error) {
        throw error
      }
    })
  })
})


