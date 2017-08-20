// @flow

import React, { Component } from 'react'

import type { FoliageGrid } from '../flowTypes/Foliage'

type Props = {
	width: number,
	height: number,
	pixelHeight: number,
	pixelWidth: number,
	foliageGrid: FoliageGrid
}

class FoliageCanvas extends Component {
	canvas: HTMLCanvasElement

	props: Props

	state: {
		foliageGrid: FoliageGrid
	}

	constructor(props: Props) {
		super(props)
		this.state = {
			foliageGrid: props.foliageGrid
		}
	}

	componentDidMount() {
		this.drawFoliage()
	}

	drawFoliage() {
		const { pixelHeight, pixelWidth } = this.props
		const { foliageGrid } = this.state

		const context = this.canvas.getContext('2d')

		context.beginPath()
		for (let x = 0; x < foliageGrid.length; x++) {
			for (let y = 0; y < foliageGrid[x].length; y++) {
				const { foliage } = foliageGrid[x][y]

				if (foliage) {
					if (foliage.hasGerminated) {
						context.fillStyle = 'rgba(255,0,0,0.8)'
						context.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth / 2, pixelHeight * foliage.size)
					} else {
						context.fillStyle = 'rgba(0,255,0,0.8)'
						context.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth / 3, 1)
					}
				}
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

export default FoliageCanvas
