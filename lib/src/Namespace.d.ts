import type { Universe } from './interface';
import type { NamespaceType } from './namespaces/interface';
import type { Random } from './random';
export declare class Namespace {
    private data;
    private universes;
    random: Random;
    constructor(data: any, namespace: NamespaceType, random: Random);
    getSubset(ctx?: Universe | Universe[]): any;
    private parseData;
}
