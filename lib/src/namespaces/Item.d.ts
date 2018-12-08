import { Universe } from '../interface';
import { Namespace } from '../Namespace';
export declare class Item extends Namespace {
    constructor(data: any);
    weapon(ctx?: Universe | Universe[]): any;
    tool(ctx?: Universe | Universe[]): any;
    vehicle(ctx?: Universe | Universe[]): any;
    any(ctx?: Universe | Universe[]): any;
}
