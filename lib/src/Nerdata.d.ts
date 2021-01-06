import type { Universe } from './interface';
import type { INerdataOpts } from './interface';
import { Item } from './namespaces/Item';
import { Name } from './namespaces/Name';
import { Place } from './namespaces/Place';
import { Quote } from './namespaces/Quote';
import { Random } from './random';
import { Species } from './namespaces/Species';
export declare class Nerdata {
    static resetCache(): void;
    _random: Random;
    name: Name;
    item: Item;
    place: Place;
    species: Species;
    quote: Quote;
    _allUniverses: () => Universe[];
    private _data;
    constructor(opts?: INerdataOpts);
    _universes: () => Universe[];
    private _setup;
    private _getData;
    private _loadData;
    private _limitByExclusion;
    private _limitByInclusion;
}
