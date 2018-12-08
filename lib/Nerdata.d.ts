import { INerdataOpts } from "./interface";
import { Item } from "./namespaces/Item";
import { Name } from "./namespaces/Name";
import { Place } from "./namespaces/Place";
import { Quote } from "./namespaces/Quote";
import { Species } from "./namespaces/Species";
export declare class Nerdata {
    static resetCache(): void;
    name: Name;
    place: Place;
    item: Item;
    species: Species;
    quote: Quote;
    _allUniverses: any;
    _universes: any;
    private _data;
    constructor(opts?: INerdataOpts);
    allUniverses(): string[];
    private _setup;
    private _getData;
    private _loadData;
    private _limitByExclusion;
    private _limitByInclusion;
}
