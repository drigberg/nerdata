import { expect } from 'chai'
import { NerdFaker } from '../src/NerdFaker'

describe('NerdFaker', () => {
  describe('universes', () => {
    describe('no args', () => {
      it('success', () => {
        const faker = new NerdFaker()

        expect(faker.universes()).have.same.members([
          'dune',
          'rick-and-morty',
          'star-wars',
        ])
      })
    })

    describe('limit by inclusion', () => {
      describe('positive', () => {
        describe('uppercase', () => {
          it('string', () => {
            const faker = new NerdFaker({
              include: 'DUNE'
            })

            expect(faker.universes()).have.same.members([
              'dune',
            ])
          })

          it('array - one item', () => {
            const faker = new NerdFaker({
              include: ['STAR-WARS']
            })

            expect(faker.universes()).have.same.members([
              'star-wars',
            ])
          })

          it('array - two items', () => {
            const faker = new NerdFaker({
              include: ['DUNE', 'STAR-WARS']
            })

            expect(faker.universes()).have.same.members([
              'dune',
              'star-wars',
            ])
          })

          it('array - all items', () => {
            const faker = new NerdFaker({
              include: ['DUNE', 'STAR-WARS', 'RICK-AND-MORTY']
            })

            expect(faker.universes()).have.same.members([
              'dune',
              'star-wars',
              'rick-and-morty',
            ])
          })
        })

        describe('lowercase', () => {
          it('string', () => {

          })

          it('array - one item', () => {

          })

          it('array - two items', () => {

          })

          it('array - all items', () => {

          })
        })
      })

      describe('negative', () => {
        it('empty array', () => {

        })

        it('invalid universe', () => {

        })
      })
    })

    describe('limit by exclusion', () => {
      describe('positive', () => {
        describe('uppercase', () => {
          it('string', () => {

          })

          it('array - one item', () => {

          })

          it('array - two items', () => {

          })
        })

        describe('lowercase', () => {
          it('string', () => {

          })

          it('array - one item', () => {

          })

          it('array - two items', () => {

          })
        })
      })

      describe('negative', () => {
        it('array - all items', () => {

        })

        it('invalid universe', () => {

        })
      })
    })
  })
})