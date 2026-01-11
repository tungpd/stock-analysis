import { getData } from 'functions/apis/API'
import { useQuery } from '@tanstack/react-query'
import { Info } from 'types/Info'
import { getChartUrl } from 'components/PriceChart/PriceChart.functions'
import { InitialData } from 'types/Charts'

async function queryChart(symbol: string, type: string, time: string) {
	if (!time) return
	if (typeof symbol === 'undefined') return

	let url = getChartUrl(symbol, type, time)
	return await getData(url)
}

export function useChart(info: Info, time: string, initial: InitialData, initialFetch: boolean) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let expiration = initialFetch ? initial.expiration : undefined

	const { data, isFetching } = useQuery(
		['change', info.symbol, info.type, time],
		() => queryChart(info.symbol, info.type, time),
		{
			// initialData: initial.data,
			// initialDataUpdatedAt: Date.now() - 60000, // expiration,
			refetchOnWindowFocus: false,
			enabled: info.state !== 'upcomingipo', // && !info.archived,
			notifyOnChangeProps: 'tracked',
			retry: false
		}
	)

	return { data, isFetching }
}
