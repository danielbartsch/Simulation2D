// @flow

import * as SeedDispersalTypes from './SeedDispersalTypes'
import * as SeedTypes from './SeedTypes'
import * as TerrainTypes from './TerrainTypes'
import type { FoliageType } from '../flowTypes/Foliage'

// kiloJoule of seeds according to https://www.nutritionix.com/

export const CherryTree: FoliageType = {
	seed: {
		dispersalTypes: [SeedDispersalTypes.GRAVITY, SeedDispersalTypes.ANIMALS],
		type: SeedTypes.ANGIOSPERM,
		kiloJoule: 21.7568,
		isWaterProof: true,
		stability: 0.8
	},
	terrainTypes: [TerrainTypes.GRASS],
	minimumGroundFertility: 0.6,
	lifeExpectancy: 90
}

export const AppleTree: FoliageType = {
	seed: {
		dispersalTypes: [SeedDispersalTypes.GRAVITY, SeedDispersalTypes.ANIMALS],
		type: SeedTypes.ANGIOSPERM,
		kiloJoule: 397.48,
		isWaterProof: true,
		stability: 0.3
	},
	terrainTypes: [TerrainTypes.GRASS],
	minimumGroundFertility: 0.7,
	lifeExpectancy: 75
}

export const WalnutTree: FoliageType = {
	seed: {
		dispersalTypes: [SeedDispersalTypes.GRAVITY, SeedDispersalTypes.ANIMALS],
		type: SeedTypes.ANGIOSPERM,
		kiloJoule: 54.392,
		isWaterProof: false,
		stability: 0.5
	},
	terrainTypes: [TerrainTypes.GRASS],
	minimumGroundFertility: 0.5,
	lifeExpectancy: 85
}

export const WillowTree: FoliageType = {
	seed: {
		dispersalTypes: [SeedDispersalTypes.WIND, SeedDispersalTypes.ANIMALS],
		type: SeedTypes.ANGIOSPERM,
		kiloJoule: 0.08,
		isWaterProof: false,
		stability: 0.5
	},
	terrainTypes: [TerrainTypes.GRASS],
	minimumGroundFertility: 0.6,
	lifeExpectancy: 130
}

export const Dandelion: FoliageType = {
	seed: {
		dispersalTypes: [SeedDispersalTypes.WIND, SeedDispersalTypes.ANIMALS],
		type: SeedTypes.ANGIOSPERM,
		kiloJoule: 0.01,
		isWaterProof: false,
		stability: 0.1
	},
	terrainTypes: [TerrainTypes.GRASS],
	minimumGroundFertility: 0.3,
	lifeExpectancy: 0.5
}

export const WaterLily: FoliageType = {
	seed: {
		dispersalTypes: [SeedDispersalTypes.WATER],
		type: SeedTypes.ANGIOSPERM,
		kiloJoule: 0.04,
		isWaterProof: true,
		stability: 0.5
	},
	terrainTypes: [TerrainTypes.WATER],
	minimumGroundFertility: 0.7,
	lifeExpectancy: 6
}

export const RaspberryBush: FoliageType = {
	seed: {
		dispersalTypes: [SeedDispersalTypes.ANIMALS, SeedDispersalTypes.GRAVITY],
		type: SeedTypes.ANGIOSPERM,
		kiloJoule: 4.184,
		isWaterProof: false,
		stability: 0.05
	},
	terrainTypes: [TerrainTypes.GRASS],
	minimumGroundFertility: 0.6,
	lifeExpectancy: 10
}

export const StrawberryPlant: FoliageType = {
	seed: {
		dispersalTypes: [SeedDispersalTypes.ANIMALS, SeedDispersalTypes.GRAVITY],
		type: SeedTypes.ANGIOSPERM,
		kiloJoule: 25.104,
		isWaterProof: false,
		stability: 0.1
	},
	terrainTypes: [TerrainTypes.GRASS],
	minimumGroundFertility: 0.4,
	lifeExpectancy: 0.5
}
