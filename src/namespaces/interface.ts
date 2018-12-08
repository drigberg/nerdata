import { Universe } from '../interface'

export type ItemType = 'tool' | 'vehicle' | 'weapon'
export type NamespaceType = 'items' | 'names' | 'places' | 'quotes' | 'species'
export type PlaceType = 'city' | 'planet'
export type SpeciesType = 'nonsentient' | 'sentient'

export interface Item {
  readonly name: string
  readonly type: ItemType
}

export interface Name {
  readonly first: string
  readonly last?: string
}

export interface Place {
  readonly name: string
  readonly type: PlaceType
}

export interface Quote {
  readonly text: string
  readonly speaker: ItemType
}

export interface Species {
  readonly name: string
  readonly type: SpeciesType
}

export interface DataWithContext {
  ctx: Universe
}