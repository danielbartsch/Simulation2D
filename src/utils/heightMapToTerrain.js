// @flow

import { range, cloneDeep } from 'lodash'
import * as TerrainTypes from '../constants/TerrainTypes'
import type { HeightMap, TerrainMap } from '../flowTypes/Terrain'
import { getMedian } from './heightMapUtils'

const markHeightMap = (
	heightMap: HeightMap,
	x: number,
	y: number,
	condition: (value: number) => boolean,
	markValue: number
): HeightMap => {
	let queue = []
	const checkedCoordinates = []
	const heightMapCopy = cloneDeep(heightMap)

	const markAtCoordinate = (xCoord, yCoord) => {
		if (
			xCoord >= 0 && xCoord < heightMapCopy.length &&
			yCoord >= 0 && yCoord < heightMapCopy[0].length &&
			heightMapCopy[xCoord][yCoord] < markValue &&
			condition(heightMapCopy[xCoord][yCoord])
		) {
			if (!checkedCoordinates.some(([x2, y2]) => x2 === xCoord && y2 === yCoord)) {
				heightMapCopy[xCoord][yCoord] += markValue
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
	return heightMapCopy
}

const markLessThanValueHeightMap = (heightMap, x, y, value, markValue) =>
	markHeightMap(heightMap, x, y, heightMapValue => heightMapValue <= value, markValue)

export const heightMapToTerrain = (heightMap: HeightMap): TerrainMap => {
	const median = getMedian(heightMap)

	const waterMarkValue = 10

	const lakePositions = range(5).map(() => ({
		x: parseInt(Math.random() * heightMap.length, 10),
		y: parseInt(Math.random() * heightMap[0].length, 10)
	}))

	return lakePositions.reduce((heightMapWithLakes, { x, y }) => (
		heightMap[x][y] <= median ?
			markLessThanValueHeightMap(heightMapWithLakes, x, y, heightMapWithLakes[x][y], waterMarkValue) :
			heightMapWithLakes
	), heightMap).map(yArray => yArray.map(height => ({
		height: height > waterMarkValue ? height - waterMarkValue : height,
		terrain: height > waterMarkValue ? TerrainTypes.WATER : TerrainTypes.GRASS
	})))
}
