import { Universe } from '../interface';
export declare type ItemType = 'tool' | 'vehicle' | 'weapon';
export declare type NamespaceType = 'items' | 'names' | 'places' | 'quotes' | 'species';
export declare type PlaceType = 'city' | 'realm';
export declare type SpeciesType = 'nonsentient' | 'sentient';
export interface IItem {
    readonly name: string;
    readonly type: ItemType;
}
export interface IName {
    readonly first: string;
    readonly last?: string;
}
export interface IPlace {
    readonly name: string;
    readonly type: PlaceType;
}
export interface IQuote {
    readonly text: string;
    readonly speaker: ItemType;
}
export interface ISpecies {
    readonly name: string;
    readonly type: SpeciesType;
}
export interface IDataWithContext {
    ctx: Universe;
}
