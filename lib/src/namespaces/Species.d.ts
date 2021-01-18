import { Namespace } from '../Namespace';
import type { Random } from '../random';
import type { Universe } from '../interface';
export declare class Species extends Namespace {
    constructor(data: any, random: Random);
    sentient(ctx?: Universe | Universe[]): string;
    nonsentient(ctx?: Universe | Universe[]): string;
    any(ctx?: Universe | Universe[]): string;
}
