import { expect } from 'chai'
import { readFileSync } from 'fs'
import { before, describe, it } from 'mocha'
import * as path from 'path'
import { Nerdata } from '../../src/Nerdata'

describe('Place', () => {
  let data: any
  let nerdata: Nerdata

  before(() => {
    nerdata = new Nerdata({ include: ['star-wars', 'rick-and-morty'] })

    const rickAndMortyPlaces = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', '..', 'data', 'rick-and-morty.json'),
      ).toString(),
    ).places

    const starWarsPlaces = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', '..', 'data', 'star-wars.json'),
      ).toString(),
    ).places

    data = {
      rickAndMorty: {
        cities: rickAndMortyPlaces
          .filter((item: any) => item.type === 'city')
          .map((item: any) => item.name),
        places: rickAndMortyPlaces.map((item: any) => item.name),
        realms: rickAndMortyPlaces
          .filter((item: any) => item.type === 'realm')
          .map((item: any) => item.name),
      },
      starWars: {
        cities: starWarsPlaces
          .filter((item: any) => item.type === 'city')
          .map((item: any) => item.name),
        places: starWarsPlaces.map((item: any) => item.name),
        realms: starWarsPlaces
          .filter((item: any) => item.type === 'realm')
          .map((item: any) => item.name),
      },
    }
  })

  describe('enumeration', () => {
    it('methods are enumerable', () => {
      expect(Object.keys((new Nerdata()).place)).to.have.same.members([
        'realm',
        'city',
        'any',
      ])
    })
  })

  describe('any', () => {
    it('returns a string', () => {
      expect(nerdata.place.any()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.places).to.include(nerdata.place.any('star-wars'))
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.places).to.include(
          nerdata.place.any(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.places.concat(data.starWars.places)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.any(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.place.any('dune')
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

  describe('city', () => {
    it('returns a string', () => {
      expect(nerdata.place.city()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.cities).to.include(
          nerdata.place.city('star-wars'),
        )
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.cities).to.include(
          nerdata.place.city(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.cities.concat(data.starWars.cities)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.city(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.place.city('dune')
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

  describe('realm', () => {
    it('returns a string', () => {
      expect(nerdata.place.realm()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.realms).to.include(
          nerdata.place.realm('star-wars'),
        )
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.realms).to.include(
          nerdata.place.realm(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.realms.concat(data.starWars.realms)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.realm(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.place.realm('dune')
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
