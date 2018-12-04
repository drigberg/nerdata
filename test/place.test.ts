const { expect } = require("chai");
import { Nerdata } from "../src/Nerdata";
import { readFileSync } from "fs";
import * as path from "path";

describe("Place", () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ["star-wars", "rick-and-morty"] });

    const rickAndMortyPlaces = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "data", "rick-and-morty.json"),
      ).toString(),
    ).places;

    const starWarsPlaces = JSON.parse(
      readFileSync(
        path.join(__dirname, "..", "data", "star-wars.json"),
      ).toString(),
    ).places;

    data = {
      rickAndMorty: {
        cities: rickAndMortyPlaces
          .filter((item: any) => item.type === "city")
          .map((item: any) => item.name),
        places: rickAndMortyPlaces.map((item: any) => item.name),
        planets: rickAndMortyPlaces
          .filter((item: any) => item.type === "planet")
          .map((item: any) => item.name),
      },
      starWars: {
        cities: starWarsPlaces
          .filter((item: any) => item.type === "city")
          .map((item: any) => item.name),
        places: starWarsPlaces.map((item: any) => item.name),
        planets: starWarsPlaces
          .filter((item: any) => item.type === "planet")
          .map((item: any) => item.name),
      },
    };
  });

  describe("place", () => {
    it("returns a place", () => {
      expect(nerdata.place.place()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.places).to.include(
          nerdata.place.place("star-wars"),
        );
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.places).to.include(
          nerdata.place.place(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.places.concat(data.starWars.places);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.place(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.place.city("dune");
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

  describe("city", () => {
    it("returns a city", () => {
      expect(nerdata.place.city()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.cities).to.include(
          nerdata.place.city("star-wars"),
        );
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.cities).to.include(
          nerdata.place.city(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.cities.concat(data.starWars.cities);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.city(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.place.city("dune");
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

  describe("planet", () => {
    it("returns a planet", () => {
      expect(nerdata.place.planet()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.planets).to.include(
          nerdata.place.planet("star-wars"),
        );
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.planets).to.include(
          nerdata.place.planet(["star-wars"]),
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.planets.concat(data.starWars.planets);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.planet(["star-wars", "rick-and-morty"]),
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined = undefined;
      try {
        nerdata.place.planet("dune");
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
