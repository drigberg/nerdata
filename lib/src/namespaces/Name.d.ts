import { Namespace } from './Namespace';
import { Name } from '../interface';
import type { Random } from '../random';
import type { Universe, DataOrNullByUniverse } from '../interface';
declare type NamesByUniverse = Record<Universe, Name[]>;
export declare class Names extends Namespace {
    data: NamesByUniverse;
    constructor(data: DataOrNullByUniverse, random: Random);
    private parseData;
    getNamesSubset(ctx: null | Universe | Universe[]): Name[];
    first(ctx?: Universe | Universe[]): string;
    last(ctx?: Universe | Universe[]): string;
    full(ctx?: Universe | Universe[]): string;
}
export {};
