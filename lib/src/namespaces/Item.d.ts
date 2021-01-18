import { Namespace } from '../Namespace';
import type { Random } from '../random';
import type { Universe } from '../interface';
export declare class Item extends Namespace {
    constructor(data: any, random: Random);
    weapon(ctx?: Universe | Universe[]): string;
    tool(ctx?: Universe | Universe[]): string;
    vehicle(ctx?: Universe | Universe[]): string;
    any(ctx?: Universe | Universe[]): string;
}
