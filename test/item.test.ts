const { expect } = require("chai");
import { Nerdata } from "../src/Nerdata";
import { readFileSync } from "fs";
import * as path from "path";

describe("Item", () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ["star-wars", "rick-and-morty"] });

    const rickAndMortyItems = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "data", "rick-and-morty.json"),
      ).toString(),
    ).items;

    const starWarsItems = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "data", "star-wars.json"),
      ).toString(),
    ).items;

    data = {
      rickAndMorty: {
        item: rickAndMortyItems.map((item: any) => item.name),
      },
      starWars: {
        item: starWarsItems.map((item: any) => item.name),
      },
    };
  });

  describe("item", () => {
    it("returns a item", () => {
      expect(nerdata.item.item()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.item).to.include(nerdata.item.item("star-wars"));
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.item).to.include(nerdata.item.item(["star-wars"]));
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.item.concat(data.starWars.item);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.item.item(["star-wars", "rick-and-morty"]),
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
