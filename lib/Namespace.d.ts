import { NamespaceType } from './namespaces/interface';
import { Universe } from './interface';
export declare class Namespace {
    private data;
    private universes;
    constructor(data: any, namespace: NamespaceType);
    getSubset(ctx?: Universe | Universe[]): any;
    private parseData;
}
