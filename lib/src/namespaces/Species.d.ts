import { Namespace } from '../Namespace';
import type { Random } from '../random';
import type { Universe } from '../interface';
export declare class Species extends Namespace {
    constructor(data: any, random: Random);
    sentient(ctx?: Universe | Universe[]): any;
    nonsentient(ctx?: Universe | Universe[]): any;
    any(ctx?: Universe | Universe[]): any;
}
