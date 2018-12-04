const { expect } = require("chai");
import { Nerdata } from "../../src/Nerdata";
import { readFileSync } from "fs";
import * as path from "path";

describe("Species", () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ["star-wars", "rick-and-morty"] });

    const rickAndMortySpecies = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "..", "data", "rick-and-morty.json"),
      ).toString(),
    ).species;

    const starWarsSpecies = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "..", "data", "star-wars.json"),
      ).toString(),
    ).species;

    data = {
      rickAndMorty: {
        sentient: rickAndMortySpecies
          .filter((item: any) => item.type === "sentient")
          .map((item: any) => item.name),
        all: rickAndMortySpecies.map((item: any) => item.name),
        nonsentient: rickAndMortySpecies
          .filter((item: any) => item.type === "nonsentient")
          .map((item: any) => item.name),
      },
      starWars: {
        sentient: starWarsSpecies
          .filter((item: any) => item.type === "sentient")
          .map((item: any) => item.name),
        all: starWarsSpecies.map((item: any) => item.name),
        nonsentient: starWarsSpecies
          .filter((item: any) => item.type === "nonsentient")
          .map((item: any) => item.name),
      },
    };
  });

  describe("any", () => {
    it("returns a string", () => {
      expect(nerdata.species.any()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(nerdata.species.any("star-wars"));
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.all).to.include(
          nerdata.species.any(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.all.concat(data.starWars.all);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.any(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.species.any("dune");
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

  describe("sentient", () => {
    it("returns a string", () => {
      expect(nerdata.species.sentient()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.sentient).to.include(
          nerdata.species.sentient("star-wars"),
        );
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.sentient).to.include(
          nerdata.species.sentient(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.sentient.concat(
        data.starWars.sentient,
      );
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.sentient(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.species.sentient("dune");
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

  describe("nonsentient", () => {
    it("returns a string", () => {
      expect(nerdata.species.nonsentient()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.nonsentient).to.include(
          nerdata.species.nonsentient("star-wars"),
        );
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.nonsentient).to.include(
          nerdata.species.nonsentient(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.nonsentient.concat(
        data.starWars.nonsentient,
      );
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.species.nonsentient(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.species.nonsentient("dune");
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
