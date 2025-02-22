/* eslint-disable import/no-anonymous-default-export */
/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/stochasticOscillator.js

The MIT License (MIT)

Copyright (c) 2014-2015 Scott Logic Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
import { max, mean, min, zip } from 'd3-array'
import { slidingWindow } from '../utils'
import { FullStochasticOscillator as defaultOptions } from './defaultOptionsForComputation'
export default function Sto() {
	let options = defaultOptions
	let source = (d) => ({
		open: d.open,
		high: d.high,
		low: d.low,
		close: d.close
	})
	const calculator = (data) => {
		const { windowSize, kWindowSize, dWindowSize } = options
		const high = (d) => source(d).high
		const low = (d) => source(d).low
		const close = (d) => source(d).close
		const kWindow = slidingWindow()
			.windowSize(windowSize)
			.accumulator((values) => {
				const highestHigh = max(values, high)
				if (highestHigh === undefined) {
					return undefined
				}
				const lowestLow = min(values, low)
				if (lowestLow === undefined) {
					return undefined
				}
				const currentClose = close(values[values.length - 1])
				const k =
					((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100
				return k
			})
		const kSmoothed = slidingWindow()
			.skipInitial(windowSize - 1)
			.windowSize(kWindowSize)
			.accumulator((values) => mean(values))
		const dWindow = slidingWindow()
			.skipInitial(windowSize - 1 + kWindowSize - 1)
			.windowSize(dWindowSize)
			.accumulator((values) => mean(values))
		const kData = kSmoothed(kWindow(data))
		const dData = dWindow(kData)
		// @ts-ignore
		const indicatorData = zip(kData, dData).map((d) => {
			return {
				K: d[0],
				D: d[1]
			}
		})
		return indicatorData
	}
	calculator.undefinedLength = () => {
		const { windowSize, kWindowSize, dWindowSize } = options
		return windowSize + kWindowSize + dWindowSize
	}
	calculator.source = (newSource) => {
		if (newSource === undefined) {
			return source
		}
		source = newSource
		return calculator
	}
	calculator.options = (newOptions) => {
		if (newOptions === undefined) {
			return options
		}
		options = Object.assign(Object.assign({}, defaultOptions), newOptions)
		return calculator
	}
	return calculator
}
// # sourceMappingURL=sto.js.map
