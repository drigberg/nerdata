"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const path = require("path");
const Nerdata_1 = require("../../src/Nerdata");
describe('Name', () => {
    let data;
    let nerdata;
    before(() => {
        nerdata = new Nerdata_1.Nerdata({ include: ['star-wars', 'dune'] });
        const duneNames = JSON.parse(fs_1.readFileSync(path.join(__dirname, '..', '..', 'data', 'dune.json')).toString()).names;
        const starWarsNames = JSON.parse(fs_1.readFileSync(path.join(__dirname, '..', '..', 'data', 'star-wars.json')).toString()).names;
        data = {
            dune: {
                first: duneNames.map((item) => item.first),
                full: duneNames.map((name) => [name.first, name.last].filter((item) => item).join(' ')),
                last: duneNames
                    .map((item) => item.last)
                    .filter((item) => item),
            },
            starWars: {
                first: starWarsNames.map((item) => item.first),
                full: starWarsNames.map((name) => [name.first, name.last].filter((item) => item).join(' ')),
                last: starWarsNames
                    .map((item) => item.last)
                    .filter((item) => item),
            },
        };
    });
    describe('enumeration', () => {
        it('methods are enumerable', () => {
            chai_1.expect(Object.keys((new Nerdata_1.Nerdata()).name)).to.have.same.members([
                'first',
                'last',
                'full',
            ]);
        });
    });
    describe('first', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.name.first()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.dune.first).to.include(nerdata.name.first('dune'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.first).to.include(nerdata.name.first(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.dune.first.concat(data.starWars.first);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.name.first(['star-wars', 'dune']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.name.first('rick-and-morty');
            }
            catch (err) {
                error = err;
            }
            if (!error) {
                throw new Error('expected error');
            }
            chai_1.expect(error.message).to.equal('The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars');
        });
    });
    describe('last', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.name.last()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.dune.last).to.include(nerdata.name.last('dune'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.last).to.include(nerdata.name.last(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.dune.last.concat(data.starWars.last);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.name.last(['star-wars', 'dune']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.name.last('rick-and-morty');
            }
            catch (err) {
                error = err;
            }
            if (!error) {
                throw new Error('expected error');
            }
            chai_1.expect(error.message).to.equal('The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars');
        });
    });
    describe('full', () => {
        it('returns a string', () => {
            chai_1.expect(nerdata.name.full()).to.be.a('string');
        });
        it('filters by universe: string', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.dune.full).to.include(nerdata.name.full('dune'));
            }
        });
        it('filters by universe: array (single)', () => {
            for (let i = 0; i < 10; i++) {
                chai_1.expect(data.starWars.full).to.include(nerdata.name.full(['star-wars']));
            }
        });
        it('filters by universe: array (multiple)', () => {
            const fullArray = data.dune.full.concat(data.starWars.full);
            for (let i = 0; i < 10; i++) {
                chai_1.expect(fullArray).to.include(nerdata.name.full(['star-wars', 'dune']));
            }
        });
        it('throws error when unloaded universe is requested', () => {
            let error;
            try {
                nerdata.name.full('rick-and-morty');
            }
            catch (err) {
                error = err;
            }
            if (!error) {
                throw new Error('expected error');
            }
            chai_1.expect(error.message).to.equal('The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars');
        });
    });
});
//# sourceMappingURL=name.test.js.map