import { UNIVERSES } from './interface'
import type { Universe } from './interface'

export const isValidUniverse = (
  input: string,
): input is Universe => {
  return input in UNIVERSES
}
