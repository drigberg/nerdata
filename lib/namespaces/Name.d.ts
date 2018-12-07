import { Namespace } from "../Namespace";
export declare class Name extends Namespace {
    constructor(data: any);
    first(ctx?: string | string[]): any;
    last(ctx?: string | string[]): any;
    full(ctx?: string | string[]): string;
}
