import { Namespace } from '../Namespace';
import type { Random } from '../random';
import type { Universe } from '../interface';
export declare class Place extends Namespace {
    constructor(data: any, random: Random);
    city(ctx?: Universe | Universe[]): any;
    realm(ctx?: Universe | Universe[]): any;
    any(ctx?: Universe | Universe[]): any;
}
