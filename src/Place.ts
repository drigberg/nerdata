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

  public place(ctx?: string | string[]) {
    return sample(this.getSubset(ctx)).name;
  }
}
