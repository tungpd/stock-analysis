/* eslint-disable import/no-anonymous-default-export */
import { merge, rebind } from '../utils'
import { compare } from '../calculator'
import baseIndicator from './baseIndicator'
const ALGORITHM_TYPE = 'Compare'
export default function Compare() {
	const base = baseIndicator()
		.type(ALGORITHM_TYPE)
		.accessor((d) => d.compare)
	const underlyingAlgorithm = compare()
	const mergedAlgorithm = merge()
		.algorithm(underlyingAlgorithm)
		.merge((datum, i) => {
			datum.compare = i
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
	rebind(indicator, mergedAlgorithm, 'merge')
	return indicator
}
// # sourceMappingURL=compare.js.map
