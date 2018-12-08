"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const path = require("path");
const Nerdata_1 = require("../../src/Nerdata");
describe('Quote', () => {
    let data;
    let nerdata;
    before(() => {
        nerdata = new Nerdata_1.Nerdata({ include: ['star-wars', 'rick-and-morty'] });
        const rickAndMortyQuotes = JSON.parse(fs_1.readFileSync(path.join(__dirname, '..', '..', 'data', 'rick-and-morty.json')).toString()).quotes;
        const starWarsQuotes = JSON.parse(fs_1.readFileSync(path.join(__dirname, '..', '..', 'data', 'star-wars.json')).toString()).quotes;
        data = {
            rickAndMorty: {
                full: rickAndMortyQuotes,
                text: rickAndMortyQuotes.map((item) => item.text),
            },
            starWars: {
                full: starWarsQuotes,
                text: starWarsQuotes.map((item) => item.text),
            },
        };
    });
    describe('enumeration', () => {
        it('methods are enumerable', () => {
            chai_1.expect(Object.keys((new Nerdata_1.Nerdata()).quote)).to.have.same.members([
                'sentence',
                'paragraph',
            ]);
        });
    });
    describe('sentence', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.quote.sentence()).to.be.a('string');
        });
        describe('citation = true', () => {
            it('returns a string', () => {
                chai_1.expect(nerdata.quote.sentence(undefined, { citation: true })).to.be.a('string');
            });
            it('appends speaker', () => {
                for (let i = 0; i < 10; i++) {
                    const sentence = nerdata.quote.sentence(undefined, { citation: true });
                    const all = data.rickAndMorty.full.concat(data.starWars.full);
                    const match = all.find((quote) => sentence.includes(quote.text) && sentence.includes(quote.speaker));
                    chai_1.expect(match).to.be.an('object');
                    chai_1.expect(sentence).to.equal(`"${match.text}" - ${match.speaker}`);
                }
            });
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.text).to.include(nerdata.quote.sentence('star-wars'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.text).to.include(nerdata.quote.sentence(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.rickAndMorty.text.concat(data.starWars.text);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.quote.sentence(['star-wars', 'rick-and-morty']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.quote.sentence('dune');
            }
            catch (err) {
                error = err;
            }
            if (!error) {
                throw new Error('expected error');
            }
            chai_1.expect(error.message).to.equal('The following universes were not loaded when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars');
        });
    });
    describe('paragraph', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.quote.paragraph()).to.be.a('string');
        });
        it('opts.sentences = 1', () => {
            const paragraph = nerdata.quote.paragraph(undefined, { sentences: 1 });
            chai_1.expect(paragraph).to.be.a('string');
            chai_1.expect(data.rickAndMorty.text.concat(data.starWars.text)).to.include(paragraph);
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.text).to.include(nerdata.quote.paragraph('star-wars', { sentences: 1 }));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.text).to.include(nerdata.quote.paragraph(['star-wars'], { sentences: 1 }));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.rickAndMorty.text.concat(data.starWars.text);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.quote.paragraph(['star-wars', 'rick-and-morty'], {
                    sentences: 1,
                }));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.quote.paragraph('dune');
            }
            catch (err) {
                error = err;
            }
            if (!error) {
                throw new Error('expected error');
            }
            chai_1.expect(error.message).to.equal('The following universes were not loaded when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars');
        });
    });
});
//# sourceMappingURL=quote.test.js.map