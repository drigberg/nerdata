import { Universe } from './interface';
import { NamespaceType } from './namespaces/interface';
export declare class Namespace {
    private data;
    private universes;
    constructor(data: any, namespace: NamespaceType);
    getSubset(ctx?: Universe | Universe[]): any;
    private parseData;
}
