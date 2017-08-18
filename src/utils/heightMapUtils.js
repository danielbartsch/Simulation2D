// @flow

import { range } from 'lodash'
import { normalizedNoise } from './noise'
import type { HeightMap } from '../flowTypes/Terrain'

const reduceHeightMapValues = (heightMap: HeightMap, min: number, max: number, amountOfValues: number): HeightMap => {
	const numberRange = max - min
	const newValues = range(amountOfValues).map((_, index) => (numberRange / amountOfValues) * (index + 1))

	return heightMap.map(yArray => yArray.map((value) => {
		let i = 0

		while (value < newValues[i] || value > (newValues[i + 1] || max)) {
			i++
		}
		return newValues[i]
	}))
}

const normalizeHeightMap = (heightMap: HeightMap, min: number, max: number): HeightMap =>
	heightMap.map(yArray => yArray.map(value => (value + Math.abs(min)) / (max + Math.abs(min))))

export const generateHeightMap = (width: number, height: number) => {
	const heightMap = new Array(width)
	let maxPerlin = 0
	let minPerlin = 0

	for (let x = 0; x < width; x++) {
		heightMap[x] = new Array(height)
		for (let y = 0; y < height; y++) {
			heightMap[x][y] = normalizedNoise(x / (width / 6), y / (height / 6))
			if (heightMap[x][y] > maxPerlin) {
				maxPerlin = heightMap[x][y]
			}
			if (heightMap[x][y] < minPerlin) {
				minPerlin = heightMap[x][y]
			}
		}
	}

	return reduceHeightMapValues(heightMap, 0, 1, 10)
}

const getSortedPoints = (heightMap: HeightMap): Array<number> =>
	heightMap.reduce((accumulator, yArray) => [...accumulator, ...yArray], []).sort()

export const getFirstQuartile = (heightMap: HeightMap): number => {
	const points = getSortedPoints(heightMap)

	return points[Math.floor(points.length / 4)]
}

export const getMedian = (heightMap: HeightMap): number => {
	const points = getSortedPoints(heightMap)

	return points[Math.floor(points.length / 2)]
}

export const getThirdQuartile = (heightMap: HeightMap): number => {
	const points = getSortedPoints(heightMap)

	return points[Math.floor((points.length / 4) * 3)]
}

export const getQuartiles = (heightMap: HeightMap): Array<number> => {
	const points = getSortedPoints(heightMap)

	return [
		points[Math.floor(points.length / 4)],
		points[Math.floor(points.length / 2)],
		points[Math.floor((points.length / 4) * 3)]
	]
}
