export declare type Universe = 'dune' | 'lord-of-the-rings' | 'rick-and-morty' | 'star-wars' | 'naruto';
export declare const UNIVERSES: Universe[];
export interface INerdataOpts {
    readonly randomFn?: () => number;
    readonly include?: Universe | Universe[];
    readonly exclude?: Universe | Universe[];
}
