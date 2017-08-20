// @flow

import { reduce, map } from 'lodash'

import type { Foliage, FoliageType } from '../flowTypes/Foliage'
import type { TerrainType } from '../flowTypes/Terrain'
import * as FoliageTypes from '../constants/FoliageTypes'

const getRandomFoliageType = (foliageTypes: Array<FoliageType>): FoliageType =>
	foliageTypes[parseInt(Math.random() * (foliageTypes.length - 1), 10)]

const getFoliageTypesForTerrainType = (terrainType: ?TerrainType): Array<FoliageType> => (
	terrainType ?
		reduce(FoliageTypes, (accumulator, foliageType) => {
			if (foliageType.terrainTypes.includes(terrainType)) {
				return accumulator.concat(foliageType)
			}
			return accumulator
		}, []) :
		map(FoliageTypes)
)

export const getRandomFoliageForTerrainType = (terrainType: ?TerrainType): Foliage => {
	const foliageType = getRandomFoliageType(getFoliageTypesForTerrainType(terrainType))

	const hasGerminated = !Math.round(Math.random())

	return {
		type: foliageType,
		age: Math.random() * (foliageType.lifeExpectancy * 1.2),
		hasGerminated,
		size: hasGerminated ? Math.random() : 0
	}
}

export const getRandomFoliage = (): Foliage => getRandomFoliageForTerrainType()
