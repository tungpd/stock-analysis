/* eslint-disable import/no-anonymous-default-export */
import { merge, rebind } from '../utils'
import { bollingerband } from '../calculator'
import baseIndicator from './baseIndicator'
const ALGORITHM_TYPE = 'BollingerBand'
export default function BollingerBand() {
	const base = baseIndicator().type(ALGORITHM_TYPE)
	const underlyingAlgorithm = bollingerband()
	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, i) => {
			datum.bollingerBand = i
		})
	const indicator = (data, options = { merge: true }) => {
		if (options.merge) {
			if (!base.accessor()) {
				throw new Error(
					`Set an accessor to ${ALGORITHM_TYPE} before calculating`
				)
			}
			return mergedAlgorithm(data)
		}
		return underlyingAlgorithm(data)
	}
	rebind(indicator, base, 'id', 'accessor', 'stroke', 'fill', 'echo', 'type')
	rebind(indicator, underlyingAlgorithm, 'options')
	rebind(indicator, mergedAlgorithm, 'merge', 'skipUndefined')
	return indicator
}
// # sourceMappingURL=bollingerBand.js.map
