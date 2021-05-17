import { dataByUniverse } from '../../src/data';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { Nerdata } from '../../src/Nerdata';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Name', () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ['Star Wars', 'Dune'] });

    const duneNames = dataByUniverse.Dune.names;
    const starWarsNames = dataByUniverse['Star Wars'].names;

    data = {
      Dune: {
        first: duneNames.map((item: any) => item.first),
        full: duneNames.map((name: any) =>
          [name.first, name.last].filter((item: any) => item).join(' ')
        ),
        last: duneNames
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
        expect(data.Dune.first).to.include(nerdata.name.first('Dune'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.first).to.include(
          nerdata.name.first(['Star Wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.Dune.first.concat(data.starWars.first);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.first(['Star Wars', 'Dune']));
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.name.first('Rick and Morty');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not selected when Nerdata was initialized: Rick and Morty. Only the following are currently available: Dune, Star Wars'
      );
    });
  });

  describe('last', () => {
    it('returns a string', () => {
      expect(nerdata.name.last()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.Dune.last).to.include(nerdata.name.last('Dune'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.last).to.include(nerdata.name.last(['Star Wars']));
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.Dune.last.concat(data.starWars.last);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.last(['Star Wars', 'Dune']));
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.name.last('Rick and Morty');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not selected when Nerdata was initialized: Rick and Morty. Only the following are currently available: Dune, Star Wars'
      );
    });
  });

  describe('full', () => {
    it('returns a string', () => {
      expect(nerdata.name.full()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.Dune.full).to.include(nerdata.name.full('Dune'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.full).to.include(nerdata.name.full(['Star Wars']));
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.Dune.full.concat(data.starWars.full);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.full(['Star Wars', 'Dune']));
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.name.full('Rick and Morty');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not selected when Nerdata was initialized: Rick and Morty. Only the following are currently available: Dune, Star Wars'
      );
    });
  });
});
