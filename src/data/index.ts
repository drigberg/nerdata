/*
 * Module dependencies
 */

import type { DataByUniverse } from '../interface';
import * as daevabad from './Daevabad';
import * as dune from './Dune';
import * as lordOfTheRings from './Lord of the Rings';
import * as naruto from './Naruto';
import * as jojosBizarreAdventure from "./Jojo's Bizarre Adventure";
import * as rickAndMorty from './Rick and Morty';
import * as starWars from './Star Wars';

/*
 * Module
 */

export const dataByUniverse: DataByUniverse = {
  Daevabad: daevabad.data,
  Dune: dune.data,
  'Lord of the Rings': lordOfTheRings.data,
  Naruto: naruto.data,
  'Rick and Morty': rickAndMorty.data,
  'Star Wars': starWars.data,
  "JoJo's Bizarre Adventure": jojosBizarreAdventure.data,
};
