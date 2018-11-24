const { expect } = require("chai");
import { Nerdata } from "../src/Nerdata";
import { readFileSync } from "fs";
import * as path from "path";

describe("Name", () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ["star-wars", "dune"] });

    const duneNames = JSON.parse(
      readFileSync(path.join(__dirname, "..", "data", "dune.json")).toString(),
    ).names;

    const starWarsNames = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "data", "star-wars.json"),
      ).toString(),
    ).names;

    data = {
      dune: {
        first: duneNames.map((item: any) => item.first),
        last: duneNames
          .map((item: any) => item.last)
          .filter((item: any) => item),
        full: duneNames.map((item: any) =>
          [item.first, item.last].filter((item: any) => item).join(" "),
        ),
      },
      starWars: {
        first: starWarsNames.map((item: any) => item.first),
        last: starWarsNames
          .map((item: any) => item.last)
          .filter((item: any) => item),
        full: starWarsNames.map((item: any) =>
          [item.first, item.last].filter((item: any) => item).join(" "),
        ),
      },
    };
  });

  describe("first", () => {
    it("returns a name", () => {
      expect(nerdata.name.first()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.dune.first).to.include(nerdata.name.first("dune"));
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.first).to.include(
          nerdata.name.first(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.dune.first.concat(data.starWars.first);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.first(["star-wars", "dune"]));
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.name.first("rick-and-morty");
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error("expected error");
      }

      expect(error.message).to.equal(
        "The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars",
      );
    });
  });

  describe("last", () => {
    it("returns a name", () => {
      expect(nerdata.name.last()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.dune.last).to.include(nerdata.name.last("dune"));
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.last).to.include(nerdata.name.last(["star-wars"]));
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.dune.last.concat(data.starWars.last);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.last(["star-wars", "dune"]));
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.name.last("rick-and-morty");
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error("expected error");
      }

      expect(error.message).to.equal(
        "The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars",
      );
    });
  });

  describe("full", () => {
    it("returns a name", () => {
      expect(nerdata.name.full()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.dune.full).to.include(nerdata.name.full("dune"));
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.full).to.include(nerdata.name.full(["star-wars"]));
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.dune.full.concat(data.starWars.full);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(nerdata.name.full(["star-wars", "dune"]));
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.name.full("rick-and-morty");
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error("expected error");
      }

      expect(error.message).to.equal(
        "The following universes were not loaded when Nerdata was initialized: rick-and-morty. Only the following are currently available: dune, star-wars",
      );
    });
  });
});
