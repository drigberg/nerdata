import { Namespace } from '../Namespace';
import { Quote } from '../interface';
import type { Random } from '../random';
import type { Universe, DataByUniverse } from '../interface';
declare type QuotesByUniverse = Record<Universe, Quote[]>;
export declare class Quotes extends Namespace {
    data: QuotesByUniverse;
    private _defaultParagraphLength;
    constructor(data: DataByUniverse, random: Random);
    private parseData;
    sentence(ctx?: Universe | Universe[], opts?: any): string;
    paragraph(ctx?: Universe | Universe[], opts?: any): string;
}
export {};
