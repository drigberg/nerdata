import { Namespace } from "../Namespace";
import { Universe } from '../interface';
export declare class Name extends Namespace {
    constructor(data: any);
    first(ctx?: Universe | Universe[]): any;
    last(ctx?: Universe | Universe[]): any;
    full(ctx?: Universe | Universe[]): string;
}
