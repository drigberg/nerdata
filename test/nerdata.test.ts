import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Universe, UNIVERSES } from '../src/interface';
import { Nerdata } from '../src/Nerdata';

describe('Nerdata', () => {
  describe('enumeration', () => {
    it('namespaces are enumerable', () => {
      expect(Object.keys(new Nerdata())).to.have.same.members([
        'name',
        'place',
        'item',
        'quote',
        'species',
      ]);
    });
  });

  describe('universes', () => {
    describe('no args', () => {
      it('success', () => {
        const nerdata = new Nerdata();
        expect(nerdata._universes).have.same.members(UNIVERSES);
      });
    });

    describe('randomFn', () => {
      it('success', () => {
        const nerdata = new Nerdata({ randomFn: Math.random });
        expect(nerdata._universes).have.same.members(UNIVERSES);
      });
    });

    describe('limit by inclusion', () => {
      describe('positive', () => {
        it('string', () => {
          const nerdata = new Nerdata({
            include: 'Dune',
          });

          expect(nerdata._universes).have.same.members(['Dune']);
        });

        it('array - one item', () => {
          const toInclude: Universe[] = ['Star Wars'];
          const nerdata = new Nerdata({
            include: toInclude,
          });

          expect(nerdata._universes).have.same.members(toInclude);
        });

        it('array - two items', () => {
          const toInclude: Universe[] = ['Dune', 'Star Wars'];
          const nerdata = new Nerdata({
            include: toInclude,
          });

          expect(nerdata._universes).have.same.members(toInclude);
        });
      });

      describe('negative', () => {
        it('empty array', () => {
          let error: Error | undefined;
          try {
            // tslint:disable-next-line:no-unused-expression
            new Nerdata({ include: [] });
          } catch (err) {
            error = err;
          }

          if (!error) {
            throw new Error('expected error');
          }

          expect(
            error.message.startsWith(
              'opts.include must have at least one item, if specified.'
            )
          ).to.equal(true);
        });

        it('invalid universe', () => {
          let error: Error | undefined;
          try {
            // tslint:disable-next-line:no-unused-expression
            new Nerdata({
              include: ['twilight', 'duun'] as unknown as Universe[],
            });
          } catch (err) {
            error = err;
          }

          if (!error) {
            throw new Error('expected error');
          }

          expect(
            error.message.startsWith(
              'The following universes are unsupported or misspelled: duun, twilight.'
            )
          ).to.equal(true);
        });
      });
    });

    describe('limit by exclusion', () => {
      describe('positive', () => {
        it('string', () => {
          const nerdata = new Nerdata({
            exclude: 'Dune',
          });

          expect(nerdata._universes).have.same.members(
            UNIVERSES.filter((i) => i !== 'Dune')
          );
        });

        it('array - one item', () => {
          const toExclude: Universe[] = ['Star Wars'];
          const nerdata = new Nerdata({
            exclude: toExclude,
          });

          expect(nerdata._universes).have.same.members(
            UNIVERSES.filter((i) => !toExclude.includes(i))
          );
        });

        it('array - two items', () => {
          const toExclude: Universe[] = ['Dune', 'Rick and Morty'];
          const nerdata = new Nerdata({
            exclude: toExclude,
          });

          expect(nerdata._universes).have.same.members(
            UNIVERSES.filter((i) => !toExclude.includes(i))
          );
        });
      });
    });

    describe('negative', () => {
      it('array - all items', () => {
        let error: Error | undefined;
        try {
          // tslint:disable-next-line:no-unused-expression
          new Nerdata({ exclude: UNIVERSES });
        } catch (err) {
          error = err;
        }

        if (!error) {
          throw new Error('expected error');
        }

        expect(error.message).to.equal(
          'opts.exclude cannot contain all options.'
        );
      });

      it('invalid universe', () => {
        let error: Error | undefined;
        try {
          // tslint:disable-next-line:no-unused-expression
          new Nerdata({
            exclude: ['twilight', 'duun'] as unknown as Universe[],
          });
        } catch (err) {
          error = err;
        }

        if (!error) {
          throw new Error('expected error');
        }

        expect(
          error.message.startsWith(
            'The following universes are unsupported or misspelled: duun, twilight.'
          )
        ).to.equal(true);
      });
    });
  });
});
