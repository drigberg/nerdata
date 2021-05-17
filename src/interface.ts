export type Universe =
  | 'Daevabad'
  | 'Dune'
  | 'Lord of the Rings'
  | 'Rick and Morty'
  | 'Star Wars'
  | 'Naruto'
  | "JoJo's Bizarre Adventure";
export const UNIVERSES: Universe[] = [
  'Daevabad',
  'Dune',
  'Lord of the Rings',
  'Rick and Morty',
  'Star Wars',
  'Naruto',
  "JoJo's Bizarre Adventure",
];

export interface INerdataOpts {
  readonly randomFn?: () => number;
  readonly include?: Universe | Universe[];
  readonly exclude?: Universe | Universe[];
}

export type ItemType = 'tool' | 'vehicle' | 'weapon';
export type PlaceType = 'city' | 'realm';
export type SpeciesType = 'nonsentient' | 'sentient';

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
  readonly speaker: string;
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

export type DataByUniverse = Record<Universe, UniverseData>;
export type DataOrNullByUniverse = Record<Universe, UniverseData | null>;
