// @flow

import React, { Component } from 'react'

import type { Array2D } from '../flowTypes/'
import type { Terrain } from '../flowTypes/Terrain'
import type { FoliageGrid, Foliage } from '../flowTypes/Foliage'
import * as SeedDispersalTypes from '../constants/SeedDispersalTypes'
import { canFoliageGrowOnXY } from '../utils/foliage'
import { map2D } from '../utils/array2D'

type Props = {
	width: number,
	height: number,
	pixelHeight: number,
	pixelWidth: number,
	foliageGrid: FoliageGrid,
	terrainGrid: Array2D<Terrain>,
}

type State = {
	foliageGrid: FoliageGrid,
}

class FoliageCanvas extends Component {
	canvas: HTMLCanvasElement
	props: Props
	state: State
	interval: number

	constructor(props: Props) {
		super(props)
		this.state = {
			foliageGrid: props.foliageGrid,
		}
	}

	componentDidMount() {
		this.drawFoliage()

		const setFoliageAtXY = (foliageGrid: FoliageGrid, x: number, y: number, foliage: Foliage) => {
			if (
				x >= 0 && y >= 0 &&
				x < foliageGrid.length && y < foliageGrid[0].length
			) {
				if (canFoliageGrowOnXY(foliage, this.props.terrainGrid[x][y], foliageGrid[x][y])) {
					foliageGrid[x][y] = { // eslint-disable-line no-param-reassign
						...foliageGrid[x][y],
						foliage,
					}
				}
			}
		}

		if (!this.interval) {
			this.interval = setInterval(
				() => {
					const disperseQueue: Array<{ x: number, y: number, foliage: Foliage }> = []

					const agedFoliageGrid: FoliageGrid = map2D(
						this.state.foliageGrid,
						({ foliage, fertility, ...rest }, x, y) => {
							if (!foliage) {
								return { foliage, fertility, ...rest }
							}

							if (foliage.age > foliage.type.lifeExpectancy) {
								return { fertility, ...rest }
							}

							const ageRate = 0.05

							const age = foliage.age + ageRate
							const hasGerminated = age > (foliage.type.lifeExpectancy * 0.01)
							const size = hasGerminated ? foliage.size + (fertility * ageRate) : foliage.size

							if (foliage.age > foliage.type.lifeExpectancy * 0.2) {
								disperseQueue.push({
									x,
									y,
									foliage: {
										...foliage,
										age,
										size,
									},
								})
							}

							return {
								...rest,
								fertility,
								foliage: {
									...foliage,
									hasGerminated,
									age,
									size,
								},
							}
						}
					)

					this.setState({
						foliageGrid: disperseQueue.reduce((foliageGrid: FoliageGrid, { x, y, foliage }) => {
							const seedlingFoliage = {
								...foliage,
								age: 0,
								size: 0,
								hasGerminated: false,
							}

							foliage.type.seed.dispersalTypes.forEach(dispersalType => {
								switch (dispersalType) {
								case SeedDispersalTypes.ANIMALS:
									// TODO
									break
								case SeedDispersalTypes.GRAVITY:
									setFoliageAtXY(foliageGrid, x - 2, y - 2, seedlingFoliage)
									setFoliageAtXY(foliageGrid, x - 2, y, seedlingFoliage)
									setFoliageAtXY(foliageGrid, x - 2, y + 2, seedlingFoliage)
									setFoliageAtXY(foliageGrid, x, y + 2, seedlingFoliage)
									setFoliageAtXY(foliageGrid, x + 2, y + 2, seedlingFoliage)
									setFoliageAtXY(foliageGrid, x + 2, y, seedlingFoliage)
									setFoliageAtXY(foliageGrid, x + 2, y - 2, seedlingFoliage)
									setFoliageAtXY(foliageGrid, x, y - 2, seedlingFoliage)
									break
								case SeedDispersalTypes.WATER:
									// TODO
									break
								case SeedDispersalTypes.WIND:
									// TODO
									break
								}
							})

							return foliageGrid
						}, agedFoliageGrid),
					})
				},
				400
			)
		}
	}

	componentDidUpdate() {
		this.drawFoliage()
	}

	drawFoliage() {
		const { pixelHeight, pixelWidth, width, height } = this.props
		const { foliageGrid } = this.state

		const context = this.canvas.getContext('2d')

		context.clearRect(0, 0, width, height)

		context.beginPath()
		for (let x = 0; x < foliageGrid.length; x++) {
			for (let y = 0; y < foliageGrid[x].length; y++) {
				const { foliage } = foliageGrid[x][y]

				if (foliage) {
					let foliageHeight = 1
					let foliageWidth = pixelWidth / 3
					context.fillStyle = 'rgba(0,255,0,0.8)'

					if (foliage.hasGerminated) {
						context.fillStyle = 'rgba(255,0,0,0.8)'
						foliageHeight = pixelHeight * foliage.size
						foliageWidth = pixelWidth / 4
					}

					context.fillRect(
						(x * pixelWidth) + ((pixelWidth / 2) - (foliageWidth / 2)),
						((y * pixelHeight) + pixelHeight) - foliageHeight,
						foliageWidth,
						foliageHeight
					)
				}
			}
		}
	}

	render() {
		const { width, height } = this.props

		return (
			<canvas
				ref={ref => { this.canvas = ref }}
				width={width}
				height={height}
			>
                cannot render canvas, sir
			</canvas>
		)
	}
}

export default FoliageCanvas
