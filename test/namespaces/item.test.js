"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const mocha_1 = require("mocha");
const path = require("path");
const Nerdata_1 = require("../../src/Nerdata");
mocha_1.describe("Item", () => {
  let data;
  let nerdata;
  mocha_1.before(() => {
    nerdata = new Nerdata_1.Nerdata({
      include: ["star-wars", "rick-and-morty"],
    });
    const rickAndMortyItems = JSON.parse(
      fs_1
        .readFileSync(
          path.join(__dirname, "..", "..", "src", "data", "rick-and-morty.json")
        )
        .toString()
    ).items;
    const starWarsItems = JSON.parse(
      fs_1
        .readFileSync(
          path.join(__dirname, "..", "..", "src", "data", "star-wars.json")
        )
        .toString()
    ).items;
    data = {
      rickAndMorty: {
        all: rickAndMortyItems.map((item) => item.name),
        tools: rickAndMortyItems
          .filter((item) => item.type === "tool")
          .map((item) => item.name),
        vehicles: rickAndMortyItems
          .filter((item) => item.type === "vehicle")
          .map((item) => item.name),
        weapons: rickAndMortyItems
          .filter((item) => item.type === "weapon")
          .map((item) => item.name),
      },
      starWars: {
        all: starWarsItems.map((item) => item.name),
        tools: starWarsItems
          .filter((item) => item.type === "tool")
          .map((item) => item.name),
        vehicles: starWarsItems
          .filter((item) => item.type === "vehicle")
          .map((item) => item.name),
        weapons: starWarsItems
          .filter((item) => item.type === "weapon")
          .map((item) => item.name),
      },
    };
  });
  mocha_1.describe("enumeration", () => {
    mocha_1.it("methods are enumerable", () => {
      chai_1
        .expect(Object.keys(new Nerdata_1.Nerdata().item))
        .to.have.same.members(["any", "weapon", "tool", "vehicle"]);
    });
  });
  mocha_1.describe("any", () => {
    mocha_1.it("returns a string", () => {
      chai_1.expect(nerdata.item.any()).to.be.a("string");
    });
    mocha_1.it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        chai_1
          .expect(data.starWars.all)
          .to.include(nerdata.item.any("star-wars"));
      }
    });
    mocha_1.it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        chai_1
          .expect(data.starWars.all)
          .to.include(nerdata.item.any(["star-wars"]));
      }
    });
    mocha_1.it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.all.concat(data.starWars.all);
      for (let i = 0; i < 10; i++) {
        chai_1
          .expect(fullArray)
          .to.include(nerdata.item.any(["star-wars", "rick-and-morty"]));
      }
    });
    mocha_1.it("throws error when unloaded universe is requested", () => {
      let error;
      try {
        nerdata.item.any("dune");
      } catch (err) {
        error = err;
      }
      if (!error) {
        throw new Error("expected error");
      }
      chai_1
        .expect(error.message)
        .to.equal(
          "The following universes were not loaded when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars"
        );
    });
  });
  mocha_1.describe("tool", () => {
    mocha_1.it("returns a string", () => {
      chai_1.expect(nerdata.item.tool()).to.be.a("string");
    });
    mocha_1.it("filters by universe: string", () => {
      for (let i = 0; i < 10; i++) {
        chai_1
          .expect(data.starWars.tools)
          .to.include(nerdata.item.tool("star-wars"));
      }
    });
    mocha_1.it("filters by universe: array (single)", () => {
      for (let i = 0; i < 10; i++) {
        chai_1
          .expect(data.starWars.tools)
          .to.include(nerdata.item.tool(["star-wars"]));
      }
    });
    mocha_1.it("filters by universe: array (multiple)", () => {
      const fullArray = data.rickAndMorty.tools.concat(data.starWars.tools);
      for (let i = 0; i < 10; i++) {
        chai_1
          .expect(fullArray)
          .to.include(nerdata.item.tool(["star-wars", "rick-and-morty"]));
      }
    });
    mocha_1.it("throws error when unloaded universe is requested", () => {
      let error;
      try {
        nerdata.item.tool("dune");
      } catch (err) {
        error = err;
      }
      if (!error) {
        throw new Error("expected error");
      }
      chai_1
        .expect(error.message)
        .to.equal(
          "The following universes were not loaded when Nerdata was initialized: dune. Only the following are currently available: rick-and-morty, star-wars"
        );
    });
  });
});
//# sourceMappingURL=item.test.js.map
