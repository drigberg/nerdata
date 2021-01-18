/*
 * Module dependencies
 */

import { DataByUniverse } from '../interface'
import * as dune from './dune'
import * as lordOfTheRings from './lord-of-the-rings'
import * as naruto from './naruto'
import * as rickAndMorty from './rick-and-morty'
import * as starWars from './star-wars'


/*
 * Module
 */

export const dataByUniverse: DataByUniverse = {
  dune: dune.data,
  'lord-of-the-rings': lordOfTheRings.data,
  naruto: naruto.data,
  'rick-and-morty': rickAndMorty.data,
  'star-wars': starWars.data,
}
