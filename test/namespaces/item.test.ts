import { dataByUniverse } from '../../src/data';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { Nerdata } from '../../src/Nerdata';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Item', () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ['Star Wars', 'Rick and Morty'] });

    const rickAndMortyItems = dataByUniverse['Rick and Morty'].items;
    const starWarsItems = dataByUniverse['Star Wars'].items;

    data = {
      rickAndMorty: {
        all: rickAndMortyItems.map((item: any) => item.name),
        tools: rickAndMortyItems
          .filter((item: any) => item.type === 'tool')
          .map((item: any) => item.name),
        vehicles: rickAndMortyItems
          .filter((item: any) => item.type === 'vehicle')
          .map((item: any) => item.name),
        weapons: rickAndMortyItems
          .filter((item: any) => item.type === 'weapon')
          .map((item: any) => item.name),
      },
      starWars: {
        all: starWarsItems.map((item: any) => item.name),
        tools: starWarsItems
          .filter((item: any) => item.type === 'tool')
          .map((item: any) => item.name),
        vehicles: starWarsItems
          .filter((item: any) => item.type === 'vehicle')
          .map((item: any) => item.name),

        weapons: starWarsItems
          .filter((item: any) => item.type === 'weapon')
          .map((item: any) => item.name),
      },
    };
  });

  describe('enumeration', () => {
    it('methods are enumerable', () => {
      expect(Object.keys(new Nerdata().item)).to.have.same.members([
        'any',
        'weapon',
        'tool',
        'vehicle',
      ]);
    });
  });

  describe('any', () => {
    it('returns a string', () => {
      expect(nerdata.item.any()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.item.any('Star Wars'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.item.any(['Star Wars']));
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.all.concat(data.starWars.all);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.item.any(['Star Wars', 'Rick and Morty'])
        );
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.item.any('Dune');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not selected when Nerdata was initialized: Dune. Only the following are currently available: Rick and Morty, Star Wars'
      );
    });
  });

  describe('tool', () => {
    it('returns a string', () => {
      expect(nerdata.item.tool()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.tools).to.include(nerdata.item.tool('Star Wars'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.tools).to.include(
          nerdata.item.tool(['Star Wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.tools.concat(data.starWars.tools);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.item.tool(['Star Wars', 'Rick and Morty'])
        );
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.item.tool('Dune');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not selected when Nerdata was initialized: Dune. Only the following are currently available: Rick and Morty, Star Wars'
      );
    });
  });
});
