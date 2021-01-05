import { expect } from 'chai'
import { readFileSync } from 'fs'
import { before, describe, it } from 'mocha'
import * as path from 'path'
import { Nerdata } from '../../src/Nerdata'

describe('Species', () => {
  let data: any
  let nerdata: Nerdata

  before(() => {
    nerdata = new Nerdata({ include: ['star-wars', 'rick-and-morty'] })

    const rickAndMortySpecies = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', '..', 'src', 'data', 'rick-and-morty.json'),
      ).toString(),
    ).species

    const starWarsSpecies = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', '..', 'src', 'data', 'star-wars.json'),
      ).toString(),
    ).species

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
    }
  })

  describe('enumeration', () => {
    it('methods are enumerable', () => {
      expect(Object.keys((new Nerdata()).species)).to.have.same.members([
        'any',
        'sentient',
        'nonsentient',
      ])
    })
  })

  describe('any', () => {
    it('returns a string', () => {
      expect(nerdata.species.any()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.species.any('star-wars'))
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(
          nerdata.species.any(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.all.concat(data.starWars.all)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.any(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.species.any('dune')
      } catch (err) {
        error = err
      }

      if (!error) {
        throw new Error('expected error')
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not loaded when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars',
      )
    })
  })

  describe('sentient', () => {
    it('returns a string', () => {
      expect(nerdata.species.sentient()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.sentient).to.include(
          nerdata.species.sentient('star-wars'),
        )
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.sentient).to.include(
          nerdata.species.sentient(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.sentient.concat(
        data.starWars.sentient,
      )
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.sentient(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.species.sentient('dune')
      } catch (err) {
        error = err
      }

      if (!error) {
        throw new Error('expected error')
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not loaded when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars',
      )
    })
  })

  describe('nonsentient', () => {
    it('returns a string', () => {
      expect(nerdata.species.nonsentient()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.nonsentient).to.include(
          nerdata.species.nonsentient('star-wars'),
        )
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.nonsentient).to.include(
          nerdata.species.nonsentient(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.nonsentient.concat(
        data.starWars.nonsentient,
      )
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.nonsentient(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.species.nonsentient('dune')
      } catch (err) {
        error = err
      }

      if (!error) {
        throw new Error('expected error')
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not loaded when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars',
      )
    })
  })
})
