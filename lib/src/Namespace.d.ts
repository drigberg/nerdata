import type { Universe } from './interface';
import type { Random } from './random';
export declare class Namespace {
    random: Random;
    universes: Universe[];
    constructor(random: Random);
    getUniverseSubset(ctx: null | Universe | Universe[]): Universe[];
}
