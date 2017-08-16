// @flow

import React, { Component } from 'react'
import { getTerrainHSLColor } from '../utils/getTerrainHSLColor'

import type { TerrainMap } from '../flowTypes/Terrain'

class Terrain extends Component {
	canvas: HTMLCanvasElement

	props: {
		width: number,
		height: number,
		pixelHeight: number,
		pixelWidth: number,
		terrainGrid: TerrainMap
	}

	componentDidMount() {
		this.drawTerrain()
	}

	drawTerrain() {
		const { pixelHeight, pixelWidth, terrainGrid } = this.props

		const context = this.canvas.getContext('2d')

		context.beginPath()
		for (let x = 0; x < terrainGrid.length; x++) {
			for (let y = 0; y < terrainGrid[x].length; y++) {
				const { terrain, height } = terrainGrid[x][y]

				const { hue, saturation, lightness } = getTerrainHSLColor(terrain)

				context.fillStyle = `hsl(${hue}, ${saturation}%, ${parseInt(lightness * height, 10)}%)`
				context.fillRect(x * pixelWidth, (y * pixelHeight) - pixelHeight, pixelWidth, pixelHeight)
			}
		}
	}

	render() {
		const { width, height } = this.props

		return (
			<canvas
				ref={(ref) => { this.canvas = ref }}
				width={width}
				height={height}
			>
                cannot render canvas, sir
			</canvas>
		)
	}
}

export default Terrain
