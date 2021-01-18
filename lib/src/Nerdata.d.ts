import type { Universe, INerdataOpts } from './interface';
import { Items } from './namespaces/Item';
import { Names } from './namespaces/Name';
import { Places } from './namespaces/Place';
import { Quotes } from './namespaces/Quote';
import { Random } from './random';
import { Species } from './namespaces/Species';
export declare class Nerdata {
    _random: Random;
    private _data;
    _universes: Universe[];
    name: Names;
    item: Items;
    place: Places;
    species: Species;
    quote: Quotes;
    constructor(opts?: INerdataOpts);
    private _setup;
    private _getData;
    private _limitByExclusion;
    private _limitByInclusion;
}
