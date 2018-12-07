"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const Namespace_1 = require("../Namespace");
const util_1 = require("util");
class Quote extends Namespace_1.Namespace {
    constructor(data) {
        super(data, "quotes");
        this._defaultParagraphLength = 3;
    }
    sentence(ctx, opts = {}) {
        const quote = lodash_1.sample(this.getSubset(ctx));
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
exports.Quote = Quote;
//# sourceMappingURL=Quote.js.map