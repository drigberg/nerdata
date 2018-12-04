/*
 * Module dependencies
 */

import { sample } from "lodash";
import { Namespace } from "./Namespace";

/*
 * Module
 */

export class Item extends Namespace {
  constructor(data: any) {
    super(data, "items");
  }

  public item(ctx?: string | string[]) {
    return sample(this.getSubset(ctx)).name;
  }
}
