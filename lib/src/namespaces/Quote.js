"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const util_1 = require("util");
const Namespace_1 = require("../Namespace");
class Quote extends Namespace_1.Namespace {
    constructor(data, random) {
        super(data, 'quotes', random);
        this._defaultParagraphLength = 3;
        Object.defineProperty(this, '_defaultParagraphLength', {
            enumerable: false,
            writable: true,
        });
        this.sentence = this.sentence.bind(this);
        this.paragraph = this.paragraph.bind(this);
    }
    sentence(ctx, opts = {}) {
        const quote = this.random.element(this.getSubset(ctx));
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