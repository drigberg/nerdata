/*
 * Module dependencies
 */

import { isNumber } from 'util'
import { Namespace } from '../Namespace'
import { Quote } from '../interface'
import type { Random } from '../random'
import type { Universe, DataByUniverse } from '../interface'

/*
 * Module
 */

type QuotesByUniverse = Record<Universe, Quote[]>

interface SentenceOpts {
  citation?: boolean
}

interface ParagraphOpts {
  sentences?: number
}

export class Quotes extends Namespace {
  public data: QuotesByUniverse

  private _defaultParagraphLength = 3
  constructor(data: DataByUniverse, random: Random) {
    super(random)
    this.data = this.parseData(data)

    Object.defineProperty(this, '_defaultParagraphLength', {
      enumerable: false,
      writable: true,
    })

    this.sentence = this.sentence.bind(this)
    this.paragraph = this.paragraph.bind(this)
  }

  private parseData(data: DataByUniverse): QuotesByUniverse {
    const that = this
    this.universes = [] as Universe[]

    const parsed: QuotesByUniverse = Object.keys(data).reduce((acc, key) => {
      const universe = key as Universe
      const universeData = data[universe]
      if (universeData === null) {
        acc[universe] = [] as Quote[]
        return acc
      }

      acc[universe] = universeData.quotes
      that.universes.push(universe)
      return acc
    }, {} as QuotesByUniverse)
    return parsed
  }

  public sentence(ctx?: Universe | Universe[], opts: SentenceOpts = {}): string {
    const subset = this.getUniverseSubset(ctx || null)
    const validQuotes = subset.reduce((acc, universe) => {
      acc.push(...this.data[universe])
      return acc
    }, [] as Quote[])

    const quote = this.random.element(validQuotes)

    if (opts.citation === true) {
      return `"${quote.text}" - ${quote.speaker}`
    }

    return quote.text
  }

  public paragraph(ctx?: Universe | Universe[], opts: ParagraphOpts = {}): string {
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
