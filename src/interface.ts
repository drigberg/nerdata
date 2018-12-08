export type Universe = 'dune' | 'rick-and-morty' | 'star-wars'

export interface INerdataOpts {
  readonly include?: Universe | Universe[]
  readonly exclude?: Universe | Universe[]
}
