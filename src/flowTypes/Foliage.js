// @flow

import * as SeedDispersalTypes from '../constants/SeedDispersalTypes'
import * as SeedTypes from '../constants/SeedTypes'
import type { TerrainType } from './Terrain'
import type { Array2D } from './'

export type SeedDispersalType = $Keys<typeof SeedDispersalTypes> // eslint-disable-line no-undef
export type SeedType = $Keys<typeof SeedTypes> // eslint-disable-line no-undef

export type Seed = {
    dispersalTypes: Array<SeedDispersalType>,
    type: SeedType,
    kiloJoule: number,
    isWaterProof: boolean,
    stability: number
}

export type FoliageType = {
    seed: Seed,
    terrainTypes: Array<TerrainType>,
	minimumGroundFertility: number,
	lifeExpectancy: number // in years
}

export type Foliage = {
    type: FoliageType,
    age: number,
    size: number,
    hasGerminated: boolean
}

export type FoliageGrid = Array2D<{ fertility: number, foliage?: Foliage }>
