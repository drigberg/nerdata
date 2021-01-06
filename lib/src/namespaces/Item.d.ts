import { Namespace } from '../Namespace';
import type { Random } from '../random';
import type { Universe } from '../interface';
export declare class Item extends Namespace {
    constructor(data: any, random: Random);
    weapon(ctx?: Universe | Universe[]): any;
    tool(ctx?: Universe | Universe[]): any;
    vehicle(ctx?: Universe | Universe[]): any;
    any(ctx?: Universe | Universe[]): any;
}
