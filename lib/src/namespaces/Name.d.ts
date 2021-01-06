import { Namespace } from '../Namespace';
import type { Random } from '../random';
import type { Universe } from '../interface';
export declare class Name extends Namespace {
    constructor(data: any, random: Random);
    first(ctx?: Universe | Universe[]): any;
    last(ctx?: Universe | Universe[]): any;
    full(ctx?: Universe | Universe[]): string;
}
