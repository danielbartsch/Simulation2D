// @flow

import { range } from 'lodash'
import { getRandomFoliageForTerrainType } from './foliage'

import type { Array2D } from '../flowTypes/'
import type { NoiseGrid } from '../flowTypes/Noise'
import type { FoliageGrid } from '../flowTypes/Foliage'
import type { Terrain } from '../flowTypes/Terrain'

export const noiseGridToFoliage = (noiseGrid: NoiseGrid, terrainGrid: Array2D<Terrain>): FoliageGrid => {
	const foliagePositions = range(30).map(() => ({
		x: parseInt(Math.random() * noiseGrid.length, 10),
		y: parseInt(Math.random() * noiseGrid[0].length, 10)
	}))

	return noiseGrid.map((yArray, xNoise) => yArray.map((fertility, yNoise) => {
		let foliage

		if (foliagePositions.some(({ x, y }) => x === xNoise && y === yNoise)) {
			foliage = getRandomFoliageForTerrainType(terrainGrid[xNoise][yNoise].terrainType)
			if (
                fertility < foliage.type.minimumGroundFertility ||
                !foliage.type.terrainTypes.includes(terrainGrid[xNoise][yNoise].terrainType)
            ) {
				foliage = undefined
			}
		}

		return { fertility, foliage }
	}))
}
