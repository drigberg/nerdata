import type { Universe } from './interface'

export const isValidUniverse = (
  input: any,
): input is Universe => {
  return ['dune', 'lord-of-the-rings', 'rick-and-morty', 'star-wars', 'naruto'].includes(input)
}

export const isValidUniverseArray = (
  input: any,
): input is Universe[] => {
  return Array.isArray(input) && input.filter((item: any) => !isValidUniverse(item)).length === 0
}
