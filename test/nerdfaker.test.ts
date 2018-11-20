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
            const faker = new NerdFaker({
              include: 'dune'
            })

            expect(faker.universes()).have.same.members([
              'dune',
            ])
          })

          it('array - one item', () => {
            const faker = new NerdFaker({
              include: ['star-wars']
            })

            expect(faker.universes()).have.same.members([
              'star-wars',
            ])
          })

          it('array - two items', () => {
            const faker = new NerdFaker({
              include: ['dune', 'star-wars']
            })

            expect(faker.universes()).have.same.members([
              'dune',
              'star-wars',
            ])
          })

          it('array - all items', () => {
            const faker = new NerdFaker({
              include: ['dune', 'star-wars', 'rick-and-morty']
            })

            expect(faker.universes()).have.same.members([
              'dune',
              'star-wars',
              'rick-and-morty',
            ])
          })
        })
      })

      describe('negative', () => {
        it('empty array', () => {
          let error: Error | undefined = undefined
          try {
            new NerdFaker({
              include: []
            })
          } catch (err) {
            error = err
          }

          if (!error) {
            throw new Error('expected error')
          }

          expect(error.message).to.equal('opts.include must have at least one item, if specified. Options are: dune, rick-and-morty, star-wars')
        })

        it('invalid universe', () => {
          let error: Error | undefined = undefined
          try {
            new NerdFaker({
              include: ['twilight', 'duun']
            })
          } catch (err) {
            error = err
          }

          if (!error) {
            throw new Error('expected error')
          }

          expect(error.message).to.equal('The following universes are unsupported or misspelled: duun, twilight. Available universes are: dune, rick-and-morty, star-wars')
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
