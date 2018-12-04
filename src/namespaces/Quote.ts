/*
 * Module dependencies
 */

import { sample } from "lodash";
import { Namespace } from "../Namespace";

/*
 * Module
 */

export class Quote extends Namespace {
  private _defaultParagraphLength = 3;
  constructor(data: any) {
    super(data, "quotes");
  }

  public sentence(ctx?: string | string[], opts: any = {}) {
    const quote = sample(this.getSubset(ctx));

    if (opts.citation === true) {
      return `"${quote.text}" - ${quote.speaker}`;
    }

    return quote.text;
  }

  public paragraph(ctx?: string | string[], opts: any = {}) {
    let ret = [];
    for (let i = 0; i < opts.sentences || this._defaultParagraphLength; i++) {
      ret.push(this.sentence(ctx));
    }

    return ret;
  }
}
