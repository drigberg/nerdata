"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const Joi = require("joi");
const path = require("path");
const validators_1 = require("../src/validators");
describe('data validation', () => {
    const dataDir = path.join(__dirname, '..', 'data');
    const name = Joi.object().keys({
        first: Joi.string().min(1).required(),
        last: Joi.string(),
    });
    const quote = Joi.object().keys({
        speaker: Joi.string().min(1).required(),
        text: Joi.string().min(1).required(),
    });
    const item = Joi.object().keys({
        name: Joi.string().min(1).required(),
        type: Joi.string().regex(/^(weapon|tool|vehicle)$/).required(),
    });
    const place = Joi.object().keys({
        name: Joi.string().min(1).required(),
        type: Joi.string().regex(/^(city|realm)$/).required(),
    });
    const species = Joi.object().keys({
        name: Joi.string().min(1).required(),
        type: Joi.string().regex(/^(sentient|nonsentient)$/).required(),
    });
    const schema = Joi.object().keys({
        items: Joi.array().min(1).items(item),
        names: Joi.array().min(1).items(name),
        places: Joi.array().min(1).items(place),
        quotes: Joi.array().min(1).items(quote),
        species: Joi.array().min(1).items(species),
    });
    const universes = fs_1.readdirSync(dataDir)
        .filter((filename) => path.extname(filename) === '.json')
        .map((filename) => path.basename(filename, '.json'));
    it('Universes are registered and spelled correctly', () => {
        chai_1.expect(validators_1.isValidUniverseArray(universes)).to.equal(true);
    });
    universes.forEach((universe) => {
        it(`${universe}.json`, () => {
            let data;
            try {
                data = JSON.parse(fs_1.readFileSync(path.join(dataDir, `${universe}.json`)).toString());
            }
            catch (err) {
                throw new Error(`Invalid json for ${universe}`);
            }
            const { error } = Joi.validate(data, schema);
            if (error) {
                throw error;
            }
        });
    });
});
//# sourceMappingURL=data.test.js.map