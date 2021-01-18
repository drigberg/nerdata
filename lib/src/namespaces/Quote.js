"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quotes = void 0;
const util_1 = require("util");
const Namespace_1 = require("../Namespace");
class Quotes extends Namespace_1.Namespace {
    constructor(data, random) {
        super(random);
        this._defaultParagraphLength = 3;
        this.data = this.parseData(data);
        Object.defineProperty(this, '_defaultParagraphLength', {
            enumerable: false,
            writable: true,
        });
        this.sentence = this.sentence.bind(this);
        this.paragraph = this.paragraph.bind(this);
    }
    parseData(data) {
        const that = this;
        this.universes = [];
        const parsed = Object.keys(data).reduce((acc, key) => {
            const universe = key;
            const universeData = data[universe];
            if (universeData === null) {
                acc[universe] = [];
                return acc;
            }
            acc[universe] = universeData.quotes;
            that.universes.push(universe);
            return acc;
        }, {});
        return parsed;
    }
    sentence(ctx, opts = {}) {
        const subset = this.getUniverseSubset(ctx || null);
        const validQuotes = subset.reduce((acc, universe) => {
            acc.push(...this.data[universe]);
            return acc;
        }, []);
        const quote = this.random.element(validQuotes);
        if (opts.citation === true) {
            return `"${quote.text}" - ${quote.speaker}`;
        }
        return quote.text;
    }
    paragraph(ctx, opts = {}) {
        const ret = [];
        const sentences = util_1.isNumber(opts.sentences) && opts.sentences > 0
            ? opts.sentences
            : this._defaultParagraphLength;
        for (let i = 0; i < sentences; i++) {
            ret.push(this.sentence(ctx));
        }
        return ret.join(' ');
    }
}
exports.Quotes = Quotes;
//# sourceMappingURL=Quote.js.map