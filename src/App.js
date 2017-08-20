// @flow

import React, { Component } from 'react'
import Terrain from './components/Terrain'
import Foliage from './components/Foliage'
import { generateNoiseGrid } from './utils/noiseGridUtils'
import { noiseGridToTerrain } from './utils/noiseGridToTerrain'
import { noiseGridToFoliage } from './utils/noiseGridToFoliage'

class App extends Component {
	render() {
		const terrainGrid = noiseGridToTerrain(generateNoiseGrid(100, 100))

		return (
			<div>
				<div style={{ position: 'absolute' }}>
					<Terrain
						width={1000}
						height={1000}
						terrainGrid={terrainGrid}
						pixelWidth={10}
						pixelHeight={10}
					/>
				</div>
				<div style={{ position: 'absolute' }}>
					<Foliage
						width={1000}
						height={1000}
						foliageGrid={noiseGridToFoliage(generateNoiseGrid(100, 100), terrainGrid)}
						pixelWidth={10}
						pixelHeight={10}
					/>
				</div>
			</div>
		)
	}
}

export default App
