export declare class Namespace {
    private data;
    private universes;
    constructor(data: any, namespace: string);
    getSubset(ctx?: string | string[]): any;
    private parseData;
}
