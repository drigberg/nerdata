import { Namespace } from '../Namespace';
import type { Universe } from '../interface';
export declare class Quote extends Namespace {
    private _defaultParagraphLength;
    constructor(data: any);
    sentence(ctx?: Universe | Universe[], opts?: any): any;
    paragraph(ctx?: Universe | Universe[], opts?: any): string;
}
