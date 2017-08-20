// @flow

import React, { Component } from 'react'
import { getTerrainTypeHSLColor } from '../utils/getTerrainTypeHSLColor'

import type { Terrain } from '../flowTypes/Terrain'
import type { Array2D } from '../flowTypes/'

class TerrainCanvas extends Component {
	canvas: HTMLCanvasElement

	props: {
		width: number,
		height: number,
		pixelHeight: number,
		pixelWidth: number,
		terrainGrid: Array2D<Terrain>
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
				const { terrainType, height } = terrainGrid[x][y]

				const { hue, saturation, lightness } = getTerrainTypeHSLColor(terrainType)

				context.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness * height}%)`
				context.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight)
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

export default TerrainCanvas
