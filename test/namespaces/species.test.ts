import { dataByUniverse } from '../../src/data';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { Nerdata } from '../../src/Nerdata';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Species', () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ['Star Wars', 'Rick and Morty'] });

    const rickAndMortySpecies = dataByUniverse['Rick and Morty'].species;
    const starWarsSpecies = dataByUniverse['Star Wars'].species;

    data = {
      rickAndMorty: {
        all: rickAndMortySpecies.map((item: any) => item.name),
        nonsentient: rickAndMortySpecies
          .filter((item: any) => item.type === 'nonsentient')
          .map((item: any) => item.name),
        sentient: rickAndMortySpecies
          .filter((item: any) => item.type === 'sentient')
          .map((item: any) => item.name),
      },
      starWars: {
        all: starWarsSpecies.map((item: any) => item.name),
        nonsentient: starWarsSpecies
          .filter((item: any) => item.type === 'nonsentient')
          .map((item: any) => item.name),
        sentient: starWarsSpecies
          .filter((item: any) => item.type === 'sentient')
          .map((item: any) => item.name),
      },
    };
  });

  describe('enumeration', () => {
    it('methods are enumerable', () => {
      expect(Object.keys(new Nerdata().species)).to.have.same.members([
        'any',
        'sentient',
        'nonsentient',
      ]);
    });
  });

  describe('any', () => {
    it('returns a string', () => {
      expect(nerdata.species.any()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.species.any('Star Wars'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(
          nerdata.species.any(['Star Wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.all.concat(data.starWars.all);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.any(['Star Wars', 'Rick and Morty'])
        );
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.species.any('Dune');
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

  describe('sentient', () => {
    it('returns a string', () => {
      expect(nerdata.species.sentient()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.sentient).to.include(
          nerdata.species.sentient('Star Wars')
        );
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.sentient).to.include(
          nerdata.species.sentient(['Star Wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.sentient.concat(
        data.starWars.sentient
      );
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.sentient(['Star Wars', 'Rick and Morty'])
        );
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.species.sentient('Dune');
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

  describe('nonsentient', () => {
    it('returns a string', () => {
      expect(nerdata.species.nonsentient()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.nonsentient).to.include(
          nerdata.species.nonsentient('Star Wars')
        );
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.nonsentient).to.include(
          nerdata.species.nonsentient(['Star Wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.nonsentient.concat(
        data.starWars.nonsentient
      );
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.nonsentient(['Star Wars', 'Rick and Morty'])
        );
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.species.nonsentient('Dune');
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
