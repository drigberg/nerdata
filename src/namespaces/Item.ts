/*
 * Module dependencies
 */

import { sample } from "lodash";
import { Namespace } from "../Namespace";

/*
 * Module
 */

export class Item extends Namespace {
  constructor(data: any) {
    super(data, "items");
  }

  public weapon(ctx?: string | string[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === "weapon"),
    ).name;
  }

  public tool(ctx?: string | string[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === "tool"),
    ).name;
  }

  public vehicle(ctx?: string | string[]) {
    return sample(
      this.getSubset(ctx).filter((item: any) => item.type === "vehicle"),
    ).name;
  }

  public any(ctx?: string | string[]) {
    return sample(this.getSubset(ctx)).name;
  }
}
