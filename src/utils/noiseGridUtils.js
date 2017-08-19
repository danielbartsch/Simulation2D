// @flow

import { range } from 'lodash'
import { normalizedNoise } from './noise'
import type { NoiseGrid } from '../flowTypes/Noise'

const reduceNoiseGridValues = (noiseGrid: NoiseGrid, min: number, max: number, amountOfValues: number): NoiseGrid => {
	const numberRange = max - min
	const newValues = range(amountOfValues).map((_, index) => (numberRange / amountOfValues) * (index + 1))

	return noiseGrid.map(yArray => yArray.map((value) => {
		let i = 0

		while (value < newValues[i] || value > (newValues[i + 1] || max)) {
			i++
		}
		return newValues[i]
	}))
}

const normalizeNoiseGrid = (noiseGrid: NoiseGrid, min: number, max: number): NoiseGrid =>
	noiseGrid.map(yArray => yArray.map(value => (value + Math.abs(min)) / (max + Math.abs(min))))

export const generateNoiseGrid = (width: number, height: number) => {
	const noiseGrid = new Array(width)

	const permutation: Array<number> = range(256).map(() => parseInt(Math.random() * 255, 10))

	const permutations: Array<number> = new Array(512)
	for (let i = 0; i < permutation.length; i++) {
		permutations[i] = permutations[i + 256] = permutation[i] // eslint-disable-line no-multi-assign
	}

	for (let x = 0; x < width; x++) {
		noiseGrid[x] = new Array(height)
		for (let y = 0; y < height; y++) {
			noiseGrid[x][y] = normalizedNoise(x / (width / 6), y / (height / 6), permutations)
		}
	}

	return reduceNoiseGridValues(noiseGrid, 0, 1, 10)
}

const getSortedPoints = (noiseGrid: NoiseGrid): Array<number> =>
	noiseGrid.reduce((accumulator, yArray) => [...accumulator, ...yArray], []).sort()

export const getFirstQuartile = (noiseGrid: NoiseGrid): number => {
	const points = getSortedPoints(noiseGrid)

	return points[Math.floor(points.length / 4)]
}

export const getMedian = (noiseGrid: NoiseGrid): number => {
	const points = getSortedPoints(noiseGrid)

	return points[Math.floor(points.length / 2)]
}

export const getThirdQuartile = (noiseGrid: NoiseGrid): number => {
	const points = getSortedPoints(noiseGrid)

	return points[Math.floor((points.length / 4) * 3)]
}

export const getQuartiles = (noiseGrid: NoiseGrid): Array<number> => {
	const points = getSortedPoints(noiseGrid)

	return [
		points[Math.floor(points.length / 4)],
		points[Math.floor(points.length / 2)],
		points[Math.floor((points.length / 4) * 3)]
	]
}
