import { dataByUniverse } from '../../src/data';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { Nerdata } from '../../src/Nerdata';
import { DUNE_NOT_FOUND_ERROR_MESSAGE } from '../constants';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Name', () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ['star-wars', 'rick-and-morty'] });

    const rickAndMortyNames = dataByUniverse['rick-and-morty'].names;
    const starWarsNames = dataByUniverse['star-wars'].names;

    data = {
      rickAndMorty: {
        first: rickAndMortyNames.map((item: any) => item.first),
        full: rickAndMortyNames.map((name: any) =>
          [name.first, name.last].filter((item: any) => item).join(' ')
        ),
        last: rickAndMortyNames
          .map((item: any) => item.last)
          .filter((item: any) => item),
      },
      starWars: {
        first: starWarsNames.map((item: any) => item.first),
        full: starWarsNames.map((name: any) =>
          [name.first, name.last].filter((item: any) => item).join(' ')
        ),
        last: starWarsNames
          .map((item: any) => item.last)
          .filter((item: any) => item),
      },
    };
  });

  describe('enumeration', () => {
    it('methods are enumerable', () => {
      expect(Object.keys(new Nerdata().name)).to.have.same.members([
        'first',
        'last',
        'full',
      ]);
    });
  });

  describe('first', () => {
    it('returns a string', () => {
      expect(nerdata.name.first()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.rickAndMorty.first).to.include(nerdata.name.first('rick-and-morty'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.first).to.include(
          nerdata.name.first(['star-wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.first.concat(data.starWars.first);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.first(['star-wars', 'rick-and-morty']));
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.name.first('dune');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(DUNE_NOT_FOUND_ERROR_MESSAGE);
    });
  });

  describe('last', () => {
    it('returns a string', () => {
      expect(nerdata.name.last()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.rickAndMorty.last).to.include(nerdata.name.last('rick-and-morty'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.last).to.include(nerdata.name.last(['star-wars']));
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.last.concat(data.starWars.last);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.last(['star-wars', 'rick-and-morty']));
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.name.last('dune');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(DUNE_NOT_FOUND_ERROR_MESSAGE);
    });
  });

  describe('full', () => {
    it('returns a string', () => {
      expect(nerdata.name.full()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.rickAndMorty.full).to.include(nerdata.name.full('rick-and-morty'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.full).to.include(nerdata.name.full(['star-wars']));
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.full.concat(data.starWars.full);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.full(['star-wars', 'rick-and-morty']));
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.name.full('dune');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(DUNE_NOT_FOUND_ERROR_MESSAGE);
    });
  });
});
