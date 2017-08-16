// @flow

import React, { Component } from 'react'
import Terrain from './components/Terrain'
import { generateHeightMap } from './utils/heightMapUtils'
import { heightMapToTerrain } from './utils/heightMapToTerrain'

class App extends Component {
	render() {
		return (
			<div>
				<Terrain
					width={1000}
					height={1000}
					terrainGrid={heightMapToTerrain(generateHeightMap(200, 200))}
					pixelWidth={5}
					pixelHeight={5}
				/>
			</div>
		)
	}
}

export default App
