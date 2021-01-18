export declare type Universe = 'dune' | 'lord-of-the-rings' | 'rick-and-morty' | 'star-wars' | 'naruto';
export declare const UNIVERSES: Universe[];
export interface INerdataOpts {
    readonly randomFn?: () => number;
    readonly include?: Universe | Universe[];
    readonly exclude?: Universe | Universe[];
}
export declare type ItemType = 'tool' | 'vehicle' | 'weapon';
export declare type PlaceType = 'city' | 'realm';
export declare type SpeciesType = 'nonsentient' | 'sentient';
export interface Item {
    readonly name: string;
    readonly type: ItemType;
}
export interface Name {
    readonly first: string;
    readonly last?: string;
}
export interface NameWithLast {
    readonly first: string;
    readonly last: string;
}
export interface Place {
    readonly name: string;
    readonly type: PlaceType;
}
export interface Quote {
    readonly text: string;
    readonly speaker: ItemType;
}
export interface Species {
    readonly name: string;
    readonly type: SpeciesType;
}
export interface UniverseData {
    readonly places: Place[];
    readonly items: Item[];
    readonly names: Name[];
    readonly species: Species[];
    readonly quotes: Quote[];
}
export declare type DataByUniverse = Record<Universe, UniverseData | null>;
