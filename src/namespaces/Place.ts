/*
 * Module dependencies
 */

import { Namespace } from './Namespace';
import { Place } from '../interface';
import type { Random } from '../random';
import type { Universe, DataOrNullByUniverse } from '../interface';

/*
 * Module
 */

type PlacesByUniverse = Record<Universe, Place[]>

export class Places extends Namespace {
  public data: PlacesByUniverse

  constructor(data: DataOrNullByUniverse, random: Random) {
    super(random);

    this.data = this.parseData(data);

    this.city = this.city.bind(this);
    this.realm = this.realm.bind(this);
    this.any = this.any.bind(this);
  }

  private parseData(data: DataOrNullByUniverse): PlacesByUniverse {
    this.universes = [] as Universe[];

    const parsed: PlacesByUniverse = Object.keys(data).reduce((acc, key) => {
      const universe = key as Universe;
      const universeData = data[universe];
      if (universeData === null) {
        acc[universe] = [] as Place[];
        return acc;
      }

      acc[universe] = universeData.places;
      this.universes.push(universe);
      return acc;
    }, {} as PlacesByUniverse);
    return parsed;
  }

  public getByType(ctx: null | Universe | Universe[], type: string | null): Place {
    const subset = this.getUniverseSubset(ctx);
    const validItems = subset.reduce((acc, universe) => {
      acc.push(...this.data[universe]);
      return acc;
    }, [] as Place[]);

    if (type === null) {
      return this.random.element(validItems);
    }
    return this.random.element(
      validItems.filter((place: Place) => place.type === type),
    );
  }

  public city(ctx?: Universe | Universe[]): string {
    const place = this.getByType(ctx || null, 'city');
    return place.name;
  }

  public realm(ctx?: Universe | Universe[]): string {
    const place = this.getByType(ctx || null, 'realm');
    return place.name;
  }

  public any(ctx?: Universe | Universe[]): string {
    const place = this.getByType(ctx || null, null);
    return place.name;
  }
}
