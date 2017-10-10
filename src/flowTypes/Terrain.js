// @flow

import * as TerrainTypes from '../constants/TerrainTypes'

export type TerrainType = $Keys<typeof TerrainTypes> // eslint-disable-line no-undef

export type Terrain = {
	terrainType: TerrainType,
	height: number,
}
