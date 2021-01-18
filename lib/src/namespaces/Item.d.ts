import { Namespace } from '../Namespace';
import { Item } from '../interface';
import type { Random } from '../random';
import type { Universe, DataOrNullByUniverse } from '../interface';
declare type ItemsByUniverse = Record<Universe, Item[]>;
export declare class Items extends Namespace {
    data: ItemsByUniverse;
    constructor(data: DataOrNullByUniverse, random: Random);
    private parseData;
    getByType(ctx: null | Universe | Universe[], type: string | null): Item;
    weapon(ctx?: Universe | Universe[]): string;
    tool(ctx?: Universe | Universe[]): string;
    vehicle(ctx?: Universe | Universe[]): string;
    any(ctx?: Universe | Universe[]): string;
}
export {};
