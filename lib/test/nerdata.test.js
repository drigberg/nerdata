"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs = require("fs");
const sinon = require("sinon");
const Nerdata_1 = require("../src/Nerdata");
describe('Nerdata', () => {
    describe('enumeration', () => {
        it('namespaces are enumerable', () => {
            chai_1.expect(Object.keys(new Nerdata_1.Nerdata())).to.have.same.members([
                'name',
                'place',
                'item',
                'quote',
                'species',
            ]);
        });
    });
    describe('universes', () => {
        describe('no args', () => {
            it('success', () => {
                const nerdata = new Nerdata_1.Nerdata();
                chai_1.expect(nerdata._universes()).have.same.members([
                    'dune',
                    'rick-and-morty',
                    'star-wars',
                ]);
            });
        });
        describe('limit by inclusion', () => {
            describe('positive', () => {
                describe('lowercase', () => {
                    it('string', () => {
                        const nerdata = new Nerdata_1.Nerdata({
                            include: 'dune',
                        });
                        chai_1.expect(nerdata._universes()).have.same.members(['dune']);
                    });
                    it('array - one item', () => {
                        const nerdata = new Nerdata_1.Nerdata({
                            include: ['star-wars'],
                        });
                        chai_1.expect(nerdata._universes()).have.same.members(['star-wars']);
                    });
                    it('array - two items', () => {
                        const nerdata = new Nerdata_1.Nerdata({
                            include: ['dune', 'star-wars'],
                        });
                        chai_1.expect(nerdata._universes()).have.same.members([
                            'dune',
                            'star-wars',
                        ]);
                    });
                    it('array - all items', () => {
                        const nerdata = new Nerdata_1.Nerdata({
                            include: ['dune', 'star-wars', 'rick-and-morty'],
                        });
                        chai_1.expect(nerdata._universes()).have.same.members([
                            'dune',
                            'star-wars',
                            'rick-and-morty',
                        ]);
                    });
                });
            });
            describe('negative', () => {
                it('empty array', () => {
                    let error;
                    try {
                        new Nerdata_1.Nerdata({ include: [] });
                    }
                    catch (err) {
                        error = err;
                    }
                    if (!error) {
                        throw new Error('expected error');
                    }
                    chai_1.expect(error.message).to.equal('opts.include must have at least one item, if specified. Options are: dune, rick-and-morty, star-wars');
                });
                it('invalid universe', () => {
                    let error;
                    try {
                        new Nerdata_1.Nerdata({ include: ['twilight', 'duun'] });
                    }
                    catch (err) {
                        error = err;
                    }
                    if (!error) {
                        throw new Error('expected error');
                    }
                    chai_1.expect(error.message).to.equal('The following universes are unsupported or misspelled: duun, twilight. Available universes are: dune, rick-and-morty, star-wars');
                });
            });
        });
        describe('limit by exclusion', () => {
            describe('positive', () => {
                describe('lowercase', () => {
                    it('string', () => {
                        const nerdata = new Nerdata_1.Nerdata({
                            exclude: 'dune',
                        });
                        chai_1.expect(nerdata._universes()).have.same.members([
                            'star-wars',
                            'rick-and-morty',
                        ]);
                    });
                    it('array - one item', () => {
                        const nerdata = new Nerdata_1.Nerdata({
                            exclude: ['star-wars'],
                        });
                        chai_1.expect(nerdata._universes()).have.same.members([
                            'dune',
                            'rick-and-morty',
                        ]);
                    });
                    it('array - two items', () => {
                        const nerdata = new Nerdata_1.Nerdata({
                            exclude: ['dune', 'rick-and-morty'],
                        });
                        chai_1.expect(nerdata._universes()).have.same.members(['star-wars']);
                    });
                });
            });
            describe('negative', () => {
                it('array - all items', () => {
                    let error;
                    try {
                        new Nerdata_1.Nerdata({ exclude: ['dune', 'rick-and-morty', 'star-wars'] });
                    }
                    catch (err) {
                        error = err;
                    }
                    if (!error) {
                        throw new Error('expected error');
                    }
                    chai_1.expect(error.message).to.equal('opts.exclude cannot contain all options.');
                });
                it('invalid universe', () => {
                    let error;
                    try {
                        new Nerdata_1.Nerdata({ exclude: ['twilight', 'duun'] });
                    }
                    catch (err) {
                        error = err;
                    }
                    if (!error) {
                        throw new Error('expected error');
                    }
                    chai_1.expect(error.message).to.equal('The following universes are unsupported or misspelled: duun, twilight. Available universes are: dune, rick-and-morty, star-wars');
                });
            });
        });
    });
    describe('files', () => {
        const spy = sinon.spy(fs, 'readFileSync');
        beforeEach(() => {
            spy.resetHistory();
            Nerdata_1.Nerdata.resetCache();
        });
        after(() => {
            spy.restore();
        });
        it('are only loaded when used', () => {
            new Nerdata_1.Nerdata({ include: 'dune' });
            chai_1.expect(spy.callCount).to.equal(1);
            new Nerdata_1.Nerdata({ include: ['star-wars', 'rick-and-morty'] });
            chai_1.expect(spy.callCount).to.equal(3);
        });
        it('are only loaded once each', () => {
            new Nerdata_1.Nerdata({ include: 'dune' });
            chai_1.expect(spy.callCount).to.equal(1);
            new Nerdata_1.Nerdata({ include: 'dune' });
            chai_1.expect(spy.callCount).to.equal(1);
        });
    });
});
//# sourceMappingURL=nerdata.test.js.map