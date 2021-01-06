export type Universe = 'dune' | 'lord-of-the-rings' | 'rick-and-morty' | 'star-wars' | 'naruto'

export interface INerdataOpts {
  readonly randomFn?: () => number
  readonly include?: Universe | Universe[]
  readonly exclude?: Universe | Universe[]
}
