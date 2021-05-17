/*
 * Module dependencies
 */

import type { DataByUniverse } from '../interface';
import * as daevabad from './daevabad';
import * as dune from './dune';
import * as lordOfTheRings from './lord-of-the-rings';
import * as naruto from './naruto';
import * as jojosBizarreAdventure from './jojos-bizarre-adventure';
import * as rickAndMorty from './rick-and-morty';
import * as starWars from './star-wars';

/*
 * Module
 */

export const dataByUniverse: DataByUniverse = {
  daevabad: daevabad.data,
  dune: dune.data,
  'lord-of-the-rings': lordOfTheRings.data,
  naruto: naruto.data,
  'rick-and-morty': rickAndMorty.data,
  'star-wars': starWars.data,
  'jojos-bizarre-adventure': jojosBizarreAdventure.data,
};
