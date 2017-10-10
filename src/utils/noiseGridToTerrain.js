// @flow

import { range, cloneDeep } from 'lodash'
import * as TerrainTypes from '../constants/TerrainTypes'
import type { Array2D } from '../flowTypes/'
import type { Terrain } from '../flowTypes/Terrain'
import type { NoiseGrid } from '../flowTypes/Noise'
import { getMedian } from './noiseGridUtils'
import { map2D } from './array2D'

const markNoiseGrid = (
	noiseGrid: NoiseGrid,
	x: number,
	y: number,
	condition: (value: number) => boolean,
	markValue: number
): NoiseGrid => {
	let queue = []
	const checkedCoordinates = []
	const noiseGridCopy = cloneDeep(noiseGrid)

	const markAtCoordinate = (xCoord, yCoord) => {
		if (
			xCoord >= 0 && xCoord < noiseGridCopy.length &&
			yCoord >= 0 && yCoord < noiseGridCopy[0].length &&
			noiseGridCopy[xCoord][yCoord] < markValue &&
			condition(noiseGridCopy[xCoord][yCoord])
		) {
			if (!checkedCoordinates.some(([x2, y2]) => x2 === xCoord && y2 === yCoord)) {
				noiseGridCopy[xCoord][yCoord] += markValue
				queue.push([xCoord, yCoord])
			}
			checkedCoordinates.push([xCoord, yCoord])
		}
	}

	markAtCoordinate(x, y)

	while (queue.length !== 0) {
		const [x1, y1] = queue[0]
		queue = queue.slice(1)

		markAtCoordinate(x1 + 1, y1)
		markAtCoordinate(x1 - 1, y1)
		markAtCoordinate(x1, y1 + 1)
		markAtCoordinate(x1, y1 - 1)
	}
	return noiseGridCopy
}

const markLessThanValueNoiseGrid = (noiseGrid, x, y, value, markValue) =>
	markNoiseGrid(noiseGrid, x, y, noiseGridValue => noiseGridValue <= value, markValue)

export const noiseGridToTerrain = (noiseGrid: NoiseGrid): Array2D<Terrain> => {
	const median = getMedian(noiseGrid)

	const waterMarkValue = 10

	const lakePositions = range(3).map(() => ({
		x: parseInt(Math.random() * noiseGrid.length, 10),
		y: parseInt(Math.random() * noiseGrid[0].length, 10),
	}))

	return map2D(
		lakePositions.reduce(
			(noiseGridWithLakes, { x, y }) => (
				noiseGrid[x][y] <= median ?
					markLessThanValueNoiseGrid(noiseGridWithLakes, x, y, noiseGridWithLakes[x][y], waterMarkValue) :
					noiseGridWithLakes
			),
			noiseGrid
		),
		(height: number): Terrain => ({
			height: height > waterMarkValue ? height - waterMarkValue : height,
			terrainType: height > waterMarkValue ? TerrainTypes.WATER : TerrainTypes.GRASS,
		})
	)
}
