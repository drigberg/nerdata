import { Namespace } from "../Namespace";
export declare class Quote extends Namespace {
    private _defaultParagraphLength;
    constructor(data: any);
    sentence(ctx?: string | string[], opts?: any): any;
    paragraph(ctx?: string | string[], opts?: any): string;
}
