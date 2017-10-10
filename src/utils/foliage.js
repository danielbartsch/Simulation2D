// @flow

import { reduce, map } from 'lodash'

import type { Foliage, FoliageType, FoliageGridElement } from '../flowTypes/Foliage'
import type { Terrain, TerrainType } from '../flowTypes/Terrain'
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

	const age = Math.random() * foliageType.lifeExpectancy

	return {
		type: foliageType,
		age,
		hasGerminated: age > (foliageType.lifeExpectancy * 0.01),
		size: hasGerminated ? Math.random() : 0,
	}
}

export const getRandomFoliage = (): Foliage => getRandomFoliageForTerrainType()

export const canFoliageGrowOnXY = (
	foliage: Foliage,
	terrain: Terrain,
	{ fertility, foliage: foliageAtGrid }: FoliageGridElement
) =>
	!foliageAtGrid &&
	foliage.type.terrainTypes.includes(terrain.terrainType) &&
	fertility >= foliage.type.minimumGroundFertility
