/*
 * Module dependencies
 */

import { isNumber } from 'util'
import { Namespace } from '../Namespace'
import type { Random } from '../random'
import type { Universe } from '../interface'

/*
 * Module
 */

export class Quote extends Namespace {
  private _defaultParagraphLength = 3
  constructor(data: any, random: Random) {
    super(data, 'quotes', random)

    Object.defineProperty(this, '_defaultParagraphLength', {
      enumerable: false,
      writable: true,
    })

    this.sentence = this.sentence.bind(this)
    this.paragraph = this.paragraph.bind(this)
  }

  public sentence(ctx?: Universe | Universe[], opts: any = {}) {
    const quote = this.random.element(this.getSubset(ctx))

    if (opts.citation === true) {
      return `"${quote.text}" - ${quote.speaker}`
    }

    return quote.text
  }

  public paragraph(ctx?: Universe | Universe[], opts: any = {}) {
    const ret = []
    const sentences = isNumber(opts.sentences) && opts.sentences > 0
      ? opts.sentences
      : this._defaultParagraphLength

    for (let i = 0; i < sentences; i++) {
      ret.push(this.sentence(ctx))
    }

    return ret.join(' ')
  }
}
