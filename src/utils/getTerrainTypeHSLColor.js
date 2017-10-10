// @flow

import * as TerrainTypes from '../constants/TerrainTypes'
import type { TerrainType } from '../flowTypes/Terrain'
import type { HSL } from '../flowTypes/Color'

export const getTerrainTypeHSLColor = (terrainType: TerrainType): HSL => {
	switch (terrainType) {
	case TerrainTypes.GRASS:
		return {
			hue: 97,
			saturation: 42,
			lightness: 50,
		}
	case TerrainTypes.WATER:
		return {
			hue: 195,
			saturation: 92,
			lightness: 58,
		}
	case TerrainTypes.MOUNTAIN:
		return {
			hue: 180,
			saturation: 0,
			lightness: 50,
		}
	}

	return {
		hue: 0,
		saturation: 0,
		lightness: 0,
	}
}
