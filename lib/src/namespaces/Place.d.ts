import { Namespace } from '../Namespace';
import { Place } from '../interface';
import type { Random } from '../random';
import type { Universe, DataByUniverse } from '../interface';
declare type PlacesByUniverse = Record<Universe, Place[]>;
export declare class Places extends Namespace {
    data: PlacesByUniverse;
    constructor(data: DataByUniverse, random: Random);
    private parseData;
    getByType(ctx: null | Universe | Universe[], type: string | null): Place;
    city(ctx?: Universe | Universe[]): string;
    realm(ctx?: Universe | Universe[]): string;
    any(ctx?: Universe | Universe[]): string;
}
export {};
