import { UNIVERSES } from './interface'
import type { Universe } from './interface'

export const isValidUniverse = (
  input: string,
): input is Universe => {
  return UNIVERSES.includes(input as Universe)
}
