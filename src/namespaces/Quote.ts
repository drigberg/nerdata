/*
 * Module dependencies
 */

import { sample } from 'lodash'
import { isNumber } from 'util'
import { Namespace } from '../Namespace'

/*
 * Module
 */

export class Quote extends Namespace {
  private _defaultParagraphLength = 3
  constructor(data: any) {
    super(data, 'quotes')

    Object.defineProperty(this, '_defaultParagraphLength', {
      enumerable: false,
      writable: true,
    })

    this.sentence = this.sentence.bind(this)
    this.paragraph = this.paragraph.bind(this)
  }

  public sentence(ctx?: string | string[], opts: any = {}) {
    const quote = sample(this.getSubset(ctx))

    if (opts.citation === true) {
      return `"${quote.text}" - ${quote.speaker}`
    }

    return quote.text
  }

  public paragraph(ctx?: string | string[], opts: any = {}) {
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
