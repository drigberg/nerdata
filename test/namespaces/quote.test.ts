const { expect } = require("chai");
import { Nerdata } from "../../src/Nerdata";
import { readFileSync } from "fs";
import * as path from "path";

describe.skip("Quote", () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ["star-wars", "rick-and-morty"] });

    const rickAndMortyQuotes = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "..", "data", "rick-and-morty.json"),
      ).toString(),
    ).quotes;

    const starWarsQuotes = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "..", "data", "star-wars.json"),
      ).toString(),
    ).quotes;

    data = {
      rickAndMorty: {
        all: rickAndMortyQuotes.map((item: any) => item.text),
        weapons: rickAndMortyQuotes
          .filter((item: any) => item.type === "weapon")
          .map((item: any) => item.name),
        vehicles: rickAndMortyQuotes
          .filter((item: any) => item.type === "vehicle")
          .map((item: any) => item.name),
        tools: rickAndMortyQuotes
          .filter((item: any) => item.type === "tool")
          .map((item: any) => item.name),
      },
      starWars: {
        all: starWarsQuotes.map((item: any) => item.name),
        weapons: starWarsQuotes
          .filter((item: any) => item.type === "weapon")
          .map((item: any) => item.name),
        vehicles: starWarsQuotes
          .filter((item: any) => item.type === "vehicle")
          .map((item: any) => item.name),
        tools: starWarsQuotes
          .filter((item: any) => item.type === "tool")
          .map((item: any) => item.name),
      },
    };
  });

  describe("any", () => {
    it("returns a string", () => {
      expect(nerdata.item.any()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.item.any("star-wars"));
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.item.any(["star-wars"]));
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.all.concat(data.starWars.all);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.item.any(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.item.any("dune");
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

  describe("tool", () => {
    it("returns a string", () => {
      expect(nerdata.item.tool()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.tools).to.include(nerdata.item.tool("star-wars"));
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.tools).to.include(
          nerdata.item.tool(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.tools.concat(data.starWars.tools);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.item.tool(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.item.tool("dune");
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
