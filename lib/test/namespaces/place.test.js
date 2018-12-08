"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const path = require("path");
const Nerdata_1 = require("../../src/Nerdata");
describe('Place', () => {
    let data;
    let nerdata;
    before(() => {
        nerdata = new Nerdata_1.Nerdata({ include: ['star-wars', 'rick-and-morty'] });
        const rickAndMortyPlaces = JSON.parse(fs_1.readFileSync(path.join(__dirname, '..', '..', 'data', 'rick-and-morty.json')).toString()).places;
        const starWarsPlaces = JSON.parse(fs_1.readFileSync(path.join(__dirname, '..', '..', 'data', 'star-wars.json')).toString()).places;
        data = {
            rickAndMorty: {
                cities: rickAndMortyPlaces
                    .filter((item) => item.type === 'city')
                    .map((item) => item.name),
                places: rickAndMortyPlaces.map((item) => item.name),
                realms: rickAndMortyPlaces
                    .filter((item) => item.type === 'realm')
                    .map((item) => item.name),
            },
            starWars: {
                cities: starWarsPlaces
                    .filter((item) => item.type === 'city')
                    .map((item) => item.name),
                places: starWarsPlaces.map((item) => item.name),
                realms: starWarsPlaces
                    .filter((item) => item.type === 'realm')
                    .map((item) => item.name),
            },
        };
    });
    describe('enumeration', () => {
        it('methods are enumerable', () => {
            chai_1.expect(Object.keys((new Nerdata_1.Nerdata()).place)).to.have.same.members([
                'realm',
                'city',
                'any',
            ]);
        });
    });
    describe('any', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.place.any()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.places).to.include(nerdata.place.any('star-wars'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.places).to.include(nerdata.place.any(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.rickAndMorty.places.concat(data.starWars.places);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.place.any(['star-wars', 'rick-and-morty']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.place.any('dune');
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
    describe('city', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.place.city()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.cities).to.include(nerdata.place.city('star-wars'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.cities).to.include(nerdata.place.city(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.rickAndMorty.cities.concat(data.starWars.cities);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.place.city(['star-wars', 'rick-and-morty']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.place.city('dune');
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
    describe('realm', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.place.realm()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.realms).to.include(nerdata.place.realm('star-wars'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.realms).to.include(nerdata.place.realm(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.rickAndMorty.realms.concat(data.starWars.realms);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.place.realm(['star-wars', 'rick-and-morty']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.place.realm('dune');
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
//# sourceMappingURL=place.test.js.map