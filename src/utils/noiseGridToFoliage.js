// @flow

import { range } from 'lodash'
import { getRandomFoliageForTerrainType, canFoliageGrowOnXY } from './foliage'
import { map2D } from './array2D'

import type { Array2D } from '../flowTypes/'
import type { NoiseGrid } from '../flowTypes/Noise'
import type { FoliageGrid } from '../flowTypes/Foliage'
import type { Terrain } from '../flowTypes/Terrain'

export const noiseGridToFoliage = (noiseGrid: NoiseGrid, terrainGrid: Array2D<Terrain>): FoliageGrid => {
	const foliagePositions = range(30).map(() => ({
		x: parseInt(Math.random() * noiseGrid.length, 10),
		y: parseInt(Math.random() * noiseGrid[0].length, 10),
	}))

	return map2D(noiseGrid, (fertility, xNoise, yNoise) => {
		let foliage

		if (foliagePositions.some(({ x, y }) => x === xNoise && y === yNoise)) {
			foliage = getRandomFoliageForTerrainType(terrainGrid[xNoise][yNoise].terrainType)
			if (!canFoliageGrowOnXY(foliage, terrainGrid[xNoise][yNoise], { fertility })) {
				foliage = undefined
			}
		}

		return { fertility, foliage }
	})
}
