import { Namespace } from '../Namespace';
import type { Random } from '../random';
import type { Universe } from '../interface';
export declare class Place extends Namespace {
    constructor(data: any, random: Random);
    city(ctx?: Universe | Universe[]): string;
    realm(ctx?: Universe | Universe[]): string;
    any(ctx?: Universe | Universe[]): string;
}
