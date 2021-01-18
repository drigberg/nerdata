import { expect } from 'chai'
import * as fs from 'fs'
import { after, beforeEach, describe, it } from 'mocha'
import * as sinon from 'sinon'
import { Universe } from '../src/interface'
import { Nerdata } from '../src/Nerdata'

describe('Nerdata', () => {
  describe('enumeration', () => {
    it('namespaces are enumerable', () => {
      expect(Object.keys(new Nerdata())).to.have.same.members([
        'name',
        'place',
        'item',
        'quote',
        'species',
      ])
    })
  })

  describe('universes', () => {
    describe('no args', () => {
      it('success', () => {
        const nerdata = new Nerdata()

        expect(nerdata._universes).have.same.members([
          'dune',
          'lord-of-the-rings',
          'rick-and-morty',
          'star-wars',
          'naruto'
        ])
      })
    })

    describe('randomFn', () => {
      it('success', () => {
        const nerdata = new Nerdata({ randomFn: Math.random })

        expect(nerdata._universes).have.same.members([
          'dune',
          'lord-of-the-rings',
          'rick-and-morty',
          'star-wars',
          'naruto'
        ])
      })
    })

    describe('limit by inclusion', () => {
      describe('positive', () => {
        it('string', () => {
          const nerdata = new Nerdata({
            include: 'dune',
          })

          expect(nerdata._universes).have.same.members(['dune'])
        })

        it('array - one item', () => {
          const nerdata = new Nerdata({
            include: ['star-wars'],
          })

          expect(nerdata._universes).have.same.members(['star-wars'])
        })

        it('array - two items', () => {
          const nerdata = new Nerdata({
            include: ['dune', 'star-wars'],
          })

          expect(nerdata._universes).have.same.members([
            'dune',
            'star-wars',
          ])
        })

        it('array - all items', () => {
          const nerdata = new Nerdata({
            include: ['dune', 'star-wars', 'rick-and-morty'],
          })

          expect(nerdata._universes).have.same.members([
            'dune',
            'star-wars',
            'rick-and-morty',
          ])
        })
      })

      describe('negative', () => {
        it('empty array', () => {
          let error: Error | undefined
          try {
            // tslint:disable-next-line:no-unused-expression
            new Nerdata({ include: [] })
          } catch (err) {
            error = err
          }

          if (!error) {
            throw new Error('expected error')
          }

          expect(error.message).to.equal(
            // tslint:disable-next-line:max-line-length
            'opts.include must have at least one item, if specified. Options are: dune, lord-of-the-rings, naruto, rick-and-morty, star-wars',
          )
        })

        it('invalid universe', () => {
          let error: Error | undefined
          try {
            // tslint:disable-next-line:no-unused-expression
            new Nerdata({ include: ['twilight', 'duun'] as unknown as Universe[] })
          } catch (err) {
            error = err
          }

          if (!error) {
            throw new Error('expected error')
          }

          expect(error.message).to.equal(
            // tslint:disable-next-line:max-line-length
            'The following universes are unsupported or misspelled: duun, twilight. Available universes are: dune, lord-of-the-rings, naruto, rick-and-morty, star-wars',
          )
        })
      })
    })

    describe('limit by exclusion', () => {
      describe('positive', () => {
        it('string', () => {
          const nerdata = new Nerdata({
            exclude: 'dune',
          })

          expect(nerdata._universes).have.same.members([
            'lord-of-the-rings',
            'star-wars',
            'rick-and-morty',
            'naruto'
          ])
        })

        it('array - one item', () => {
          const nerdata = new Nerdata({
            exclude: ['star-wars'],
          })

          expect(nerdata._universes).have.same.members([
            'dune',
            'lord-of-the-rings',
            'rick-and-morty',
            'naruto'
          ])
        })

        it('array - two items', () => {
          const nerdata = new Nerdata({
            exclude: ['dune', 'rick-and-morty'],
          })

          expect(nerdata._universes).have.same.members(['lord-of-the-rings', 'star-wars', 'naruto'])
        })
      })
    })

    describe('negative', () => {
      it('array - all items', () => {
        let error: Error | undefined
        try {
          // tslint:disable-next-line:no-unused-expression
          new Nerdata({ exclude: ['dune', 'lord-of-the-rings', 'rick-and-morty', 'star-wars', 'naruto'] })
        } catch (err) {
          error = err
        }

        if (!error) {
          throw new Error('expected error')
        }

        expect(error.message).to.equal(
          'opts.exclude cannot contain all options.',
        )
      })

      it('invalid universe', () => {
        let error: Error | undefined
        try {
          // tslint:disable-next-line:no-unused-expression
          new Nerdata({ exclude: ['twilight', 'duun'] as unknown as Universe[] })
        } catch (err) {
          error = err
        }

        if (!error) {
          throw new Error('expected error')
        }

        expect(error.message).to.equal(
          // tslint:disable-next-line:max-line-length
          'The following universes are unsupported or misspelled: duun, twilight. Available universes are: dune, lord-of-the-rings, naruto, rick-and-morty, star-wars',
        )
      })
    })
  })

  describe('files', () => {
    const spy = sinon.spy(fs, 'readFileSync')
    beforeEach(() => {
      spy.resetHistory()
      Nerdata.resetCache()
    })

    after(() => {
      spy.restore()
    })

    it('are only loaded when used', () => {
      // tslint:disable-next-line:no-unused-expression
      new Nerdata({ include: 'dune' })

      expect(spy.callCount).to.equal(1)

      // tslint:disable-next-line:no-unused-expression
      new Nerdata({ include: ['star-wars', 'rick-and-morty'] })

      expect(spy.callCount).to.equal(3)
    })

    it('are only loaded once each', () => {
      // tslint:disable-next-line:no-unused-expression
      new Nerdata({ include: 'dune' })

      expect(spy.callCount).to.equal(1)

      // tslint:disable-next-line:no-unused-expression
      new Nerdata({ include: 'dune' })

      expect(spy.callCount).to.equal(1)
    })
  })
})
