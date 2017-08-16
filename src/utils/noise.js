// @flow

import { range } from 'lodash'

const permutation: Array<number> = range(256).map(() => parseInt(Math.random() * 255, 10))

const permutations: Array<number> = new Array(512)
for (let i = 0; i < permutation.length; i++) {
	permutations[i] = permutations[i + 256] = permutation[i] // eslint-disable-line no-multi-assign
}

const lerp = (t, a, b) => a + (t * (b - a))

const grad = (hash, x, y, z) => {
	const h = hash & 15
	const u = h < 8 ? x : y
	const v = h < 4 ? y : h === 12 || h === 14 ? x : z // eslint-disable-line no-nested-ternary
	return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v)
}

const fade = value => value * value * value * ((value * ((value * 6) - 15)) + 10)

export const noise = (xCoordinate: number, yCoordinate: number): number => {
	// Find unit square that contains point.
	const X = Math.floor(xCoordinate) & 255
	const Y = Math.floor(yCoordinate) & 255

	// Find relative xCoordinate,yCoordinate of point in square.
	const x = xCoordinate - Math.floor(xCoordinate)
	const y = yCoordinate - Math.floor(yCoordinate)
	// Compute fade curves for each of x,y.
	const u = fade(x)
	const v = fade(y)
	// Hash coordinates of the corners.
	const A = permutations[X] + Y
	const AA = permutations[A]
	const AB = permutations[A + 1]
	const B = permutations[X + 1] + Y
	const BA = permutations[B]
	const BB = permutations[B + 1]

	// Add blended results from the corners.
	return lerp(
		v,
		lerp(
			u,
			grad(permutations[AA], x, y, 0),
			grad(permutations[BA], x - 1, y, 0),
		),
		lerp(
			u,
			grad(permutations[AB], x, y - 1, 0),
			grad(permutations[BB], x - 1, y - 1, 0),
		),
	)
}
