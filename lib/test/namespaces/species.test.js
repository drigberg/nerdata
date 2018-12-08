"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const path = require("path");
const Nerdata_1 = require("../../src/Nerdata");
describe('Species', () => {
    let data;
    let nerdata;
    before(() => {
        nerdata = new Nerdata_1.Nerdata({ include: ['star-wars', 'rick-and-morty'] });
        const rickAndMortySpecies = JSON.parse(fs_1.readFileSync(path.join(__dirname, '..', '..', 'data', 'rick-and-morty.json')).toString()).species;
        const starWarsSpecies = JSON.parse(fs_1.readFileSync(path.join(__dirname, '..', '..', 'data', 'star-wars.json')).toString()).species;
        data = {
            rickAndMorty: {
                all: rickAndMortySpecies.map((item) => item.name),
                nonsentient: rickAndMortySpecies
                    .filter((item) => item.type === 'nonsentient')
                    .map((item) => item.name),
                sentient: rickAndMortySpecies
                    .filter((item) => item.type === 'sentient')
                    .map((item) => item.name),
            },
            starWars: {
                all: starWarsSpecies.map((item) => item.name),
                nonsentient: starWarsSpecies
                    .filter((item) => item.type === 'nonsentient')
                    .map((item) => item.name),
                sentient: starWarsSpecies
                    .filter((item) => item.type === 'sentient')
                    .map((item) => item.name),
            },
        };
    });
    describe('enumeration', () => {
        it('methods are enumerable', () => {
            chai_1.expect(Object.keys((new Nerdata_1.Nerdata()).species)).to.have.same.members([
                'any',
                'sentient',
                'nonsentient',
            ]);
        });
    });
    describe('any', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.species.any()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.all).to.include(nerdata.species.any('star-wars'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.all).to.include(nerdata.species.any(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.rickAndMorty.all.concat(data.starWars.all);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.species.any(['star-wars', 'rick-and-morty']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.species.any('dune');
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
    describe('sentient', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.species.sentient()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.sentient).to.include(nerdata.species.sentient('star-wars'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.sentient).to.include(nerdata.species.sentient(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.rickAndMorty.sentient.concat(data.starWars.sentient);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.species.sentient(['star-wars', 'rick-and-morty']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.species.sentient('dune');
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
    describe('nonsentient', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.species.nonsentient()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.nonsentient).to.include(nerdata.species.nonsentient('star-wars'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.nonsentient).to.include(nerdata.species.nonsentient(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.rickAndMorty.nonsentient.concat(data.starWars.nonsentient);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.species.nonsentient(['star-wars', 'rick-and-morty']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.species.nonsentient('dune');
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
//# sourceMappingURL=species.test.js.map