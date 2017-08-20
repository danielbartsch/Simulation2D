// @flow

import { cloneDeep } from 'lodash'
import type { Array2D } from '../flowTypes/'

export function map2D<E, T>(
	array2D: Array2D<T>,
	iterator: (iteratee: T, x: number, y: number, array2D: Array2D<T>) => E
): Array2D<E> {
	const cloned2DArray: Array2D<E> = cloneDeep(array2D)
	for (let x = 0; x < array2D.length; x++) {
		for (let y = 0; y < array2D[0].length; y++) {
			cloned2DArray[x][y] = iterator(array2D[x][y], x, y, array2D)
		}
	}
	return cloned2DArray
}
