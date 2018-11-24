import { expect } from 'chai'
import { Nerdata } from '../src/Nerdata'

describe('Nerdata', () => {
  describe('universes', () => {
    describe('no args', () => {
      it('success', () => {
        const nerdata = new Nerdata()

        expect(nerdata.universes()).have.same.members([
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
            const nerdata = new Nerdata({
              include: 'DUNE'
            })

            expect(nerdata.universes()).have.same.members([
              'dune',
            ])
          })

          it('array - one item', () => {
            const nerdata = new Nerdata({
              include: ['STAR-WARS']
            })

            expect(nerdata.universes()).have.same.members([
              'star-wars',
            ])
          })

          it('array - two items', () => {
            const nerdata = new Nerdata({
              include: ['DUNE', 'STAR-WARS']
            })

            expect(nerdata.universes()).have.same.members([
              'dune',
              'star-wars',
            ])
          })

          it('array - all items', () => {
            const nerdata = new Nerdata({
              include: ['DUNE', 'STAR-WARS', 'RICK-AND-MORTY']
            })

            expect(nerdata.universes()).have.same.members([
              'dune',
              'star-wars',
              'rick-and-morty',
            ])
          })
        })

        describe('lowercase', () => {
          it('string', () => {
            const nerdata = new Nerdata({
              include: 'dune'
            })

            expect(nerdata.universes()).have.same.members([
              'dune',
            ])
          })

          it('array - one item', () => {
            const nerdata = new Nerdata({
              include: ['star-wars']
            })

            expect(nerdata.universes()).have.same.members([
              'star-wars',
            ])
          })

          it('array - two items', () => {
            const nerdata = new Nerdata({
              include: ['dune', 'star-wars']
            })

            expect(nerdata.universes()).have.same.members([
              'dune',
              'star-wars',
            ])
          })

          it('array - all items', () => {
            const nerdata = new Nerdata({
              include: ['dune', 'star-wars', 'rick-and-morty']
            })

            expect(nerdata.universes()).have.same.members([
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
            new Nerdata({
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
            new Nerdata({
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
