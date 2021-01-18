import { Namespace } from './Namespace';
import { Species as ISpecies } from '../interface';
import type { Random } from '../random';
import type { Universe, DataOrNullByUniverse } from '../interface';
declare type SpeciesByUniverse = Record<Universe, ISpecies[]>;
export declare class Species extends Namespace {
    data: SpeciesByUniverse;
    constructor(data: DataOrNullByUniverse, random: Random);
    private parseData;
    getByType(ctx: null | Universe | Universe[], type: string | null): ISpecies;
    sentient(ctx?: Universe | Universe[]): string;
    nonsentient(ctx?: Universe | Universe[]): string;
    any(ctx?: Universe | Universe[]): string;
}
export {};
