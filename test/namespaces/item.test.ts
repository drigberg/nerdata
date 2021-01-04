import { expect } from 'chai'
import { readFileSync } from 'fs'
import { before, describe, it } from 'mocha'
import * as path from 'path'
import { Nerdata } from '../../src/Nerdata'

describe('Item', () => {
  let data: any
  let nerdata: Nerdata

  before(() => {
    nerdata = new Nerdata({ include: ['star-wars', 'rick-and-morty'] })

    const rickAndMortyItems = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', '..', 'data', 'rick-and-morty.json'),
      ).toString(),
    ).items

    const starWarsItems = JSON.parse(
      readFileSync(
        path.join(__dirname, '..', '..', 'data', 'star-wars.json'),
      ).toString(),
    ).items

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
    }
  })

  describe('enumeration', () => {
    it('methods are enumerable', () => {
      expect(Object.keys((new Nerdata()).item)).to.have.same.members([
        'any',
        'weapon',
        'tool',
        'vehicle',
      ])
    })
  })

  describe('any', () => {
    it('returns a string', () => {
      expect(nerdata.item.any()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.item.any('star-wars'))
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.item.any(['star-wars']))
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.all.concat(data.starWars.all)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.item.any(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.item.any('dune')
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

  describe('tool', () => {
    it('returns a string', () => {
      expect(nerdata.item.tool()).to.be.a('string')
    })

    it('filters by universe: string', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.tools).to.include(nerdata.item.tool('star-wars'))
      }
    })

    it('filters by universe: array (single)', () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.tools).to.include(
          nerdata.item.tool(['star-wars']),
        )
      }
    })

    it('filters by universe: array (multiple)', () => {
      const fullArray = data.rickAndMorty.tools.concat(data.starWars.tools)
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.item.tool(['star-wars', 'rick-and-morty']),
        )
      }
    })

    it('throws error when unloaded universe is requested', () => {
      let error: Error | undefined
      try {
        nerdata.item.tool('dune')
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
