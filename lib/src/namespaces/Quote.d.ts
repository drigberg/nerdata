import { Namespace } from '../Namespace';
import { Quote } from '../interface';
import type { Random } from '../random';
import type { Universe, DataByUniverse } from '../interface';
declare type QuotesByUniverse = Record<Universe, Quote[]>;
interface SentenceOpts {
    citation?: boolean;
}
interface ParagraphOpts {
    sentences?: number;
}
export declare class Quotes extends Namespace {
    data: QuotesByUniverse;
    private _defaultParagraphLength;
    constructor(data: DataByUniverse, random: Random);
    private parseData;
    sentence(ctx?: Universe | Universe[], opts?: SentenceOpts): string;
    paragraph(ctx?: Universe | Universe[], opts?: ParagraphOpts): string;
}
export {};
