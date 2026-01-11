import { getData } from 'functions/apis/API'
import { useQuery } from '@tanstack/react-query'
import { MiniChartRanges } from '../MiniChart.types'

type Props = {
	symbol: string
	type: 'stocks' | 'etf'
	range: MiniChartRanges
}

/**
 * Pass this function to react-query to fetch the mini chart data
 */
async function getMiniChartData({ symbol, type, range }: Props) {
	// If missing params, don't proceed
	if (!symbol || !type || !range) return

	// Make the URL to fetch the data from the backend
	let url = `mc?s=${symbol}&t=${type}&r=${range}`

	return await getData(url)
}

/**
 * Fetch data for a sparkline mini chart
 */
export function useMiniChart({ symbol, type, range = '1D' }: Props) {
	const { data } = useQuery([symbol, type, range], () => getMiniChartData({ symbol, type, range }), {
		refetchOnWindowFocus: false,
		retry: false
	})

	return { data }
}
