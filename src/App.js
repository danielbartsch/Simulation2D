// @flow

import React, { Component } from 'react'
import Terrain from './components/Terrain'
import { generateNoiseGrid } from './utils/noiseGridUtils'
import { noiseGridToTerrain } from './utils/noiseGridToTerrain'

class App extends Component {
	render() {
		return (
			<div>
				<div style={{ position: 'absolute' }}>
					<Terrain
						width={1000}
						height={1000}
						terrainGrid={noiseGridToTerrain(generateNoiseGrid(100, 100))}
						pixelWidth={10}
						pixelHeight={10}
					/>
				</div>
			</div>
		)
	}
}

export default App
