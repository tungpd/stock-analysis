import { getData } from 'functions/apis/API'
import { isTradingHours, isTradingHoursOpen } from 'functions/datetime/isTradingHours'
import { useQuery } from '@tanstack/react-query'
import { Info } from 'types/Info'
import { Quote } from 'types/Quote'

async function queryQuote({ queryKey }: { queryKey: (string | number)[] }) {
	const symbol = queryKey[1]
	const type = queryKey[2]
	if (typeof symbol === 'undefined') {
		return null
	}

	return await getData(`p?s=${symbol}&t=${type}`)
}

export function useQuote(info: Info) {
	const { isOTC } = info
	const tradingHours = isOTC ? isTradingHoursOpen() : isTradingHours()
	const expire = isOTC ? 65000 : 5000

	const { data } = useQuery(['q', info.symbol, info.type], queryQuote, {
		refetchInterval: tradingHours && !isOTC ? 5000 : false,
		refetchOnWindowFocus: tradingHours ? true : false,
		initialData: info.quote,
		initialDataUpdatedAt: info.quote.lf ? info.quote.lf + expire : Date.now() - 60000,
		enabled: info.state !== 'upcomingipo' && !info.archived,
		notifyOnChangeProps: 'tracked',
		retry: false
	})

	return data as Quote
}
