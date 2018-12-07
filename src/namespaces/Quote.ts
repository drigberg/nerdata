/*
 * Module dependencies
 */

import { sample } from "lodash";
import { Namespace } from "../Namespace";
import { isNumber } from "util";

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
    const ret = [];
    const sentences = isNumber(opts.sentences) && opts.sentences > 0
      ? opts.sentences
      : this._defaultParagraphLength;

    for (let i = 0; i < sentences; i++) {
      ret.push(this.sentence(ctx));
    }

    return ret.join(' ');
  }
}