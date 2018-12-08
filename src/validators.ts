import { Universe } from './interface'

export const isValidUniverse = (
  input: any,
): input is Universe => {
  return ['dune', 'rick-and-morty', 'star-wars'].includes(input)
}

export const isValidUniverseArray = (
  input: any,
): input is Universe[] => {
  return Array.isArray(input) && input.filter((item: any) => !isValidUniverse(item)).length === 0
}
