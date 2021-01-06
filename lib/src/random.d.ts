export declare class Random {
    private randomFn;
    constructor(randomFn: () => number);
    integer(from: number, to: number): number;
    element(items: any[]): any;
}
