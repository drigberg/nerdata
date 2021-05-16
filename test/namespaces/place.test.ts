import { dataByUniverse } from "../../src/data";
import { expect } from "chai";
import { before, describe, it } from "mocha";
import { Nerdata } from "../../src/Nerdata";

describe("Place", () => {
  let data: any;
  let nerdata: Nerdata;

  before(() => {
    nerdata = new Nerdata({ include: ["Star Wars", "Rick and Morty"] });

    const rickAndMortyPlaces = dataByUniverse["Rick and Morty"].places;
    const starWarsPlaces = dataByUniverse["Star Wars"].places;

    data = {
      rickAndMorty: {
        cities: rickAndMortyPlaces
          .filter((item: any) => item.type === "city")
          .map((item: any) => item.name),
        places: rickAndMortyPlaces.map((item: any) => item.name),
        realms: rickAndMortyPlaces
          .filter((item: any) => item.type === "realm")
          .map((item: any) => item.name),
      },
      starWars: {
        cities: starWarsPlaces
          .filter((item: any) => item.type === "city")
          .map((item: any) => item.name),
        places: starWarsPlaces.map((item: any) => item.name),
        realms: starWarsPlaces
          .filter((item: any) => item.type === "realm")
          .map((item: any) => item.name),
      },
    };
  });

  describe("enumeration", () => {
    it("methods are enumerable", () => {
      expect(Object.keys(new Nerdata().place)).to.have.same.members([
        "realm",
        "city",
        "any",
      ]);
    });
  });

  describe("any", () => {
    it("returns a string", () => {
      expect(nerdata.place.any()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.places).to.include(nerdata.place.any("Star Wars"));
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.places).to.include(
          nerdata.place.any(["Star Wars"])
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.places.concat(data.starWars.places);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.any(["Star Wars", "Rick and Morty"])
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined;
      try {
        nerdata.place.any("Dune");
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error("expected error");
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        "The following universes were not selected when Nerdata was initialized: Dune. Only the following are currently available: Rick and Morty, Star Wars"
      );
    });
  });

  describe("city", () => {
    it("returns a string", () => {
      expect(nerdata.place.city()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.cities).to.include(
          nerdata.place.city("Star Wars")
        );
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.cities).to.include(
          nerdata.place.city(["Star Wars"])
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.cities.concat(data.starWars.cities);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.city(["Star Wars", "Rick and Morty"])
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined;
      try {
        nerdata.place.city("Dune");
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error("expected error");
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        "The following universes were not selected when Nerdata was initialized: Dune. Only the following are currently available: Rick and Morty, Star Wars"
      );
    });
  });

  describe("realm", () => {
    it("returns a string", () => {
      expect(nerdata.place.realm()).to.be.a("string");
    });

    it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.realms).to.include(
          nerdata.place.realm("Star Wars")
        );
      }
    });

    it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        expect(data.starWars.realms).to.include(
          nerdata.place.realm(["Star Wars"])
        );
      }
    });

    it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.realms.concat(data.starWars.realms);
      for (let i = 0; i < 10; i++) {
        expect(fullArray).to.include(
          nerdata.place.realm(["Star Wars", "Rick and Morty"])
        );
      }
    });

    it("throws error when unloaded universe is requested", () => {
      let error: Error | undefined;
      try {
        nerdata.place.realm("Dune");
      } catch (err) {
        error = err;
      }

      if (!error) {
        throw new Error("expected error");
      }

      expect(error.message).to.equal(
        // tslint:disable-next-line:max-line-length
        "The following universes were not selected when Nerdata was initialized: Dune. Only the following are currently available: Rick and Morty, Star Wars"
      );
    });
  });
});
