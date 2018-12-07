import { Namespace } from "../Namespace";
export declare class Item extends Namespace {
    constructor(data: any);
    weapon(ctx?: string | string[]): any;
    tool(ctx?: string | string[]): any;
    vehicle(ctx?: string | string[]): any;
    any(ctx?: string | string[]): any;
}
