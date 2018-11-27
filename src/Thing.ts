/*
 * Module dependencies
 */

import { sample } from "lodash";
import { Namespace } from "./Namespace";

/*
 * Module
 */

export class Thing extends Namespace {
  constructor(data: any) {
    super(data, "things");
  }

  public thing(ctx?: string | string[]) {
    return sample(this.getSubset(ctx)).name;
  }
}
