export declare class Random {
    private randomFn;
    constructor(randomFn: () => number);
    integer(from: number, to: number): number;
    element<T>(items: T[]): T;
}
