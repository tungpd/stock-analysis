import { useQuery } from '@tanstack/react-query'
import { getBulkMiniChartData } from './getBulkMiniChartData'
import { MiniChartSymbols, MiniChartData, MiniChartRanges } from '../MiniChart.types'

type Props = {
	symbols: MiniChartSymbols
	range: MiniChartRanges
	initialData?: MiniChartData[]
}

/**
 * Fetch data for many sparkline mini charts at a time
 */
export function useBulkMiniChart({ symbols, range = '1D', initialData }: Props) {
	let stocks = symbols.stocks?.map((symbol: string) => `s${symbol}`)
	let etfs = symbols.etfs?.map((symbol: string) => `e${symbol}`)

	// Combine the two arrays if they are undefined
	let combined: string[] = []
	if (etfs) combined = stocks ? [...stocks, ...etfs] : etfs
	let symbolstring = combined.join(',')

	const { data } = useQuery([symbols, range], () => getBulkMiniChartData({ symbolstring, range }), {
		initialData: initialData,
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data }
}
