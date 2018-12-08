import { Namespace } from "../Namespace";
import { Universe } from '../interface';
export declare class Item extends Namespace {
    constructor(data: any);
    weapon(ctx?: Universe | Universe[]): any;
    tool(ctx?: Universe | Universe[]): any;
    vehicle(ctx?: Universe | Universe[]): any;
    any(ctx?: Universe | Universe[]): any;
}
