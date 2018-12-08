import { Namespace } from "../Namespace";
import { Universe } from '../interface';
export declare class Species extends Namespace {
    constructor(data: any);
    sentient(ctx?: Universe | Universe[]): any;
    nonsentient(ctx?: Universe | Universe[]): any;
    any(ctx?: Universe | Universe[]): any;
}
