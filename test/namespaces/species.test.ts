import { dataByUniverse } from '../../src/data';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import { Nerdata } from '../../src/Nerdata';
import { DUNE_NOT_FOUND_ERROR_MESSAGE } from '../constants';

/* eslint-disable @typescript-eslint/no-explicit-any */

describe('Species', () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ['star-wars', 'rick-and-morty'] });

    const rickAndMortySpecies = dataByUniverse['rick-and-morty'].species;
    const starWarsSpecies = dataByUniverse['star-wars'].species;

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
        expect(data.starWars.all).to.include(nerdata.species.any('star-wars'));
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(
          nerdata.species.any(['star-wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.all.concat(data.starWars.all);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.any(['star-wars', 'rick-and-morty'])
        );
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.species.any('dune');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(DUNE_NOT_FOUND_ERROR_MESSAGE);
    });
  });

  describe('sentient', () => {
    it('returns a string', () => {
      expect(nerdata.species.sentient()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.sentient).to.include(
          nerdata.species.sentient('star-wars')
        );
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.sentient).to.include(
          nerdata.species.sentient(['star-wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.sentient.concat(
        data.starWars.sentient
      );
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.sentient(['star-wars', 'rick-and-morty'])
        );
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.species.sentient('dune');
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error('expected error');
      }

      expect(error.message).to.equal(DUNE_NOT_FOUND_ERROR_MESSAGE);
    });
  });

  describe('nonsentient', () => {
    it('returns a string', () => {
      expect(nerdata.species.nonsentient()).to.be.a('string');
    });

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.nonsentient).to.include(
          nerdata.species.nonsentient('star-wars')
        );
      }
    });

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.nonsentient).to.include(
          nerdata.species.nonsentient(['star-wars'])
        );
      }
    });

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.nonsentient.concat(
        data.starWars.nonsentient
      );
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.nonsentient(['star-wars', 'rick-and-morty'])
        );
      }
    });

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined;
      try {
        nerdata.species.nonsentient('dune');
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
