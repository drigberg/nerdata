const { expect } = require("chai");
import { Nerdata } from "../src/Nerdata";
import { readFileSync } from "fs";
import * as path from "path";

describe.only("Thing", () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ["star-wars", "rick-and-morty"] });

    const rickAndMortyThings = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "data", "rick-and-morty.json"),
      ).toString(),
    ).things;

    const starWarsThings = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "data", "star-wars.json"),
      ).toString(),
    ).things;

    data = {
      rickAndMorty: {
        thing: rickAndMortyThings.map((item: any) => item.name),
      },
      starWars: {
        thing: starWarsThings.map((item: any) => item.name),
      },
    };
  });

  describe("thing", () => {
    it("returns a thing", () => {
      expect(nerdata.thing.thing()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.thing).to.include(
          nerdata.thing.thing("star-wars"),
        );
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.thing).to.include(
          nerdata.thing.thing(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.thing.concat(data.starWars.thing);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.thing.thing(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.name.first("dune");
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error("expected error");
      }

      expect(error.message).to.equal(
        "The following universes were not loaded when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars",
      );
    });
  });
});
