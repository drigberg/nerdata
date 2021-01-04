import { expect } from 'chai'
import { readFileSync } from 'fs'
import { before, describe, it } from 'mocha'
import * as path from 'path'
import { Nerdata } from '../../src/Nerdata'

describe('Name', () => {
  let data: any
  let nerdata: Nerdata

  before(() => {
    nerdata = new Nerdata({ include: ['star-wars', 'dune'] })

    const duneNames = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', '..', 'data', 'dune.json'),
      ).toString(),
    ).names

    const starWarsNames = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', '..', 'data', 'star-wars.json'),
      ).toString(),
    ).names

    data = {
      dune: {
        first: duneNames.map((item: any) => item.first),
        full: duneNames.map((name: any) =>
          [name.first, name.last].filter((item: any) => item).join(' '),
        ),
        last: duneNames
          .map((item: any) => item.last)
          .filter((item: any) => item),

      },
      starWars: {
        first: starWarsNames.map((item: any) => item.first),
        full: starWarsNames.map((name: any) =>
          [name.first, name.last].filter((item: any) => item).join(' '),
        ),
        last: starWarsNames
          .map((item: any) => item.last)
          .filter((item: any) => item),
      },
    }
  })

  describe('enumeration', () => {
    it('methods are enumerable', () => {
      expect(Object.keys((new Nerdata()).name)).to.have.same.members([
        'first',
        'last',
        'full',
      ])
    })
  })

  describe('first', () => {
    it('returns a string', () => {
      expect(nerdata.name.first()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.dune.first).to.include(nerdata.name.first('dune'))
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.first).to.include(
          nerdata.name.first(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.dune.first.concat(data.starWars.first)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.first(['star-wars', 'dune']))
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.name.first('rick-and-morty')
      } catch (err) {
        error = err
      }

      if (!error) {
        throw new Error('expected error')
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars',
      )
    })
  })

  describe('last', () => {
    it('returns a string', () => {
      expect(nerdata.name.last()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.dune.last).to.include(nerdata.name.last('dune'))
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.last).to.include(nerdata.name.last(['star-wars']))
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.dune.last.concat(data.starWars.last)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.last(['star-wars', 'dune']))
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.name.last('rick-and-morty')
      } catch (err) {
        error = err
      }

      if (!error) {
        throw new Error('expected error')
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars',
      )
    })
  })

  describe('full', () => {
    it('returns a string', () => {
      expect(nerdata.name.full()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.dune.full).to.include(nerdata.name.full('dune'))
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.full).to.include(nerdata.name.full(['star-wars']))
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.dune.full.concat(data.starWars.full)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.full(['star-wars', 'dune']))
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.name.full('rick-and-morty')
      } catch (err) {
        error = err
      }

      if (!error) {
        throw new Error('expected error')
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        'The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars',
      )
    })
  })
})
