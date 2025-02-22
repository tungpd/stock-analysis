/* eslint-disable import/no-anonymous-default-export */
import { rebind } from '../utils'
import { renko } from '../calculator'
import baseIndicator from './baseIndicator'
const ALGORITHM_TYPE = 'Renko'
export default function Renko() {
	const base = baseIndicator().type(ALGORITHM_TYPE)
	const underlyingAlgorithm = renko()
	const indicator = underlyingAlgorithm
	rebind(indicator, base, 'id', 'stroke', 'fill', 'echo', 'type')
	rebind(
		indicator,
		underlyingAlgorithm,
		'options',
		'dateAccessor',
		'dateMutator'
	)
	return indicator
}
// # sourceMappingURL=renko.js.map
