/* eslint-disable import/no-anonymous-default-export */
import { mappedSlidingWindow } from '../utils'
export default function HeikinAshi() {
	let source = (x) => x
	const calculator = (data) => {
		const algorithm = mappedSlidingWindow()
			.windowSize(2)
			.undefinedValue(({ open, high, low, close }) => {
				close = (open + high + low + close) / 4
				return { open, high, low, close }
			})
			.accumulator(([prev, now]) => {
				const { date, volume } = now
				const close = (now.open + now.high + now.low + now.close) / 4
				const open = (prev.open + prev.close) / 2
				const high = Math.max(open, now.high, close)
				const low = Math.min(open, now.low, close)
				return { date, open, high, low, close, volume }
			})
		return algorithm(data)
	}
	calculator.source = (newSource) => {
		if (newSource === undefined) {
			return source
		}
		source = newSource
		return calculator
	}
	return calculator
}
// # sourceMappingURL=heikinAshi.js.map
