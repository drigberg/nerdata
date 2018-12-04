/*
 * Module dependencies
 */

import { sample } from "lodash";
import { Namespace } from "./Namespace";

/*
 * Module
 */

export class Place extends Namespace {
  constructor(data: any) {
    super(data, "places");
  }

  public city(ctx?: string | string[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === "city"),
    ).name;
  }

  public planet(ctx?: string | string[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === "planet"),
    ).name;
  }

  public place(ctx?: string | string[]) {
    return sample(this.getSubset(ctx)).name;
  }
}
