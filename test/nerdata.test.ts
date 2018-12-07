import { expect } from "chai";
import { Nerdata } from "../src/Nerdata";
import * as sinon from "sinon";
import * as fs from "fs";

describe("Nerdata", () => {
  describe('enumeration', () => {
    it('namespaces are enumerable', () => {
      expect(Object.keys(new Nerdata())).to.have.same.members([
        'name',
        'place',
        'item',
        'quote',
        'species'
      ])
    })
  })

  describe("universes", () => {
    describe("no args", () => {
      it("success", () => {
        const nerdata = new Nerdata();

        expect(nerdata._universes()).have.same.members([
          "dune",
          "rick-and-morty",
          "star-wars",
        ]);
      });
    });

    describe("limit by inclusion", () => {
      describe("positive", () => {
        describe("uppercase", () => {
          it("string", () => {
            const nerdata = new Nerdata({
              include: "DUNE",
            });

            expect(nerdata._universes()).have.same.members(["dune"]);
          });

          it("array - one item", () => {
            const nerdata = new Nerdata({
              include: ["STAR-WARS"],
            });

            expect(nerdata._universes()).have.same.members(["star-wars"]);
          });

          it("array - two items", () => {
            const nerdata = new Nerdata({
              include: ["DUNE", "STAR-WARS"],
            });

            expect(nerdata._universes()).have.same.members([
              "dune",
              "star-wars",
            ]);
          });

          it("array - all items", () => {
            const nerdata = new Nerdata({
              include: ["DUNE", "STAR-WARS", "RICK-AND-MORTY"],
            });

            expect(nerdata._universes()).have.same.members([
              "dune",
              "star-wars",
              "rick-and-morty",
            ]);
          });
        });

        describe("lowercase", () => {
          it("string", () => {
            const nerdata = new Nerdata({
              include: "dune",
            });

            expect(nerdata._universes()).have.same.members(["dune"]);
          });

          it("array - one item", () => {
            const nerdata = new Nerdata({
              include: ["star-wars"],
            });

            expect(nerdata._universes()).have.same.members(["star-wars"]);
          });

          it("array - two items", () => {
            const nerdata = new Nerdata({
              include: ["dune", "star-wars"],
            });

            expect(nerdata._universes()).have.same.members([
              "dune",
              "star-wars",
            ]);
          });

          it("array - all items", () => {
            const nerdata = new Nerdata({
              include: ["dune", "star-wars", "rick-and-morty"],
            });

            expect(nerdata._universes()).have.same.members([
              "dune",
              "star-wars",
              "rick-and-morty",
            ]);
          });
        });
      });

      describe("negative", () => {
        it("empty array", () => {
          let error: Error | undefined = undefined;
          try {
            new Nerdata({
              include: [],
            });
          } catch (err) {
            error = err;
          }

          if (!error) {
            throw new Error("expected error");
          }

          expect(error.message).to.equal(
            "opts.include must have at least one item, if specified. Options are: dune, rick-and-morty, star-wars",
          );
        });

        it("invalid universe", () => {
          let error: Error | undefined = undefined;
          try {
            new Nerdata({
              include: ["twilight", "duun"],
            });
          } catch (err) {
            error = err;
          }

          if (!error) {
            throw new Error("expected error");
          }

          expect(error.message).to.equal(
            "The following universes are unsupported or misspelled: duun, twilight. Available universes are: dune, rick-and-morty, star-wars",
          );
        });
      });
    });

    describe("limit by exclusion", () => {
      describe("positive", () => {
        describe("uppercase", () => {
          it("string", () => {
            const nerdata = new Nerdata({
              exclude: "DUNE",
            });

            expect(nerdata._universes()).have.same.members([
              "star-wars",
              "rick-and-morty",
            ]);
          });

          it("array - one item", () => {
            const nerdata = new Nerdata({
              exclude: ["STAR-WARS"],
            });

            expect(nerdata._universes()).have.same.members([
              "dune",
              "rick-and-morty",
            ]);
          });

          it("array - two items", () => {
            const nerdata = new Nerdata({
              exclude: ["DUNE", "RICK-AND-MORTY"],
            });

            expect(nerdata._universes()).have.same.members(["star-wars"]);
          });
        });

        describe("lowercase", () => {
          it("string", () => {
            const nerdata = new Nerdata({
              exclude: "dune",
            });

            expect(nerdata._universes()).have.same.members([
              "star-wars",
              "rick-and-morty",
            ]);
          });

          it("array - one item", () => {
            const nerdata = new Nerdata({
              exclude: ["star-wars"],
            });

            expect(nerdata._universes()).have.same.members([
              "dune",
              "rick-and-morty",
            ]);
          });

          it("array - two items", () => {
            const nerdata = new Nerdata({
              exclude: ["dune", "rick-and-morty"],
            });

            expect(nerdata._universes()).have.same.members(["star-wars"]);
          });
        });
      });

      describe("negative", () => {
        it("array - all items", () => {
          let error: Error | undefined = undefined;
          try {
            new Nerdata({
              exclude: ["dune", "rick-and-morty", "star-wars"],
            });
          } catch (err) {
            error = err;
          }

          if (!error) {
            throw new Error("expected error");
          }

          expect(error.message).to.equal(
            "opts.exclude cannot contain all options.",
          );
        });

        it("invalid universe", () => {
          let error: Error | undefined = undefined;
          try {
            new Nerdata({
              exclude: ["twilight", "duun"],
            });
          } catch (err) {
            error = err;
          }

          if (!error) {
            throw new Error("expected error");
          }

          expect(error.message).to.equal(
            "The following universes are unsupported or misspelled: duun, twilight. Available universes are: dune, rick-and-morty, star-wars",
          );
        });
      });
    });
  });

  describe("files", () => {
    const spy = sinon.spy(fs, "readFileSync");
    beforeEach(() => {
      spy.resetHistory();
      Nerdata.resetCache();
    });

    after(() => {
      spy.restore();
    });

    it("are only loaded when used", () => {
      new Nerdata({
        include: "dune",
      });

      expect(spy.callCount).to.equal(1);

      new Nerdata({
        include: ["star-wars", "rick-and-morty"],
      });

      expect(spy.callCount).to.equal(3);
    });

    it("are only loaded once each", () => {
      new Nerdata({
        include: "dune",
      });

      expect(spy.callCount).to.equal(1);

      new Nerdata({
        include: "dune",
      });

      expect(spy.callCount).to.equal(1);
    });
  });
});
