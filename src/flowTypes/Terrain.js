// @flow

import * as TerrainTypes from '../constants/TerrainTypes'
import type { Array2D } from './'

export type TerrainType = $Keys<typeof TerrainTypes> // eslint-disable-line no-undef

export type Terrain = {
	terrain: TerrainType,
	height: number
}

export type HeightMap = Array2D<number>

export type TerrainMap = Array2D<Terrain>
