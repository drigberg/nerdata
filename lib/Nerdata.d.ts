import { Name } from "./namespaces/Name";
import { NerdataOpts } from "./interface";
import { Place } from "./namespaces/Place";
import { Item } from "./namespaces/Item";
import { Species } from "./namespaces/Species";
import { Quote } from "./namespaces/Quote";
export declare class Nerdata {
    name: Name;
    place: Place;
    item: Item;
    species: Species;
    quote: Quote;
    _allUniverses: any;
    _universes: any;
    private _data;
    constructor(opts?: NerdataOpts);
    static resetCache(): void;
    allUniverses(): string[];
    private _setup;
    private _getData;
    private _loadData;
    private _limitByExclusion;
    private _limitByInclusion;
}
