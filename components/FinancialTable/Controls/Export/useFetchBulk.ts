import { getData } from 'functions/apis/API'
import { buildReturnArray } from './buildReturnArray'
import { useQuery } from '@tanstack/react-query'
import { useAuthState } from 'auth/useAuthState'
const PRO_KEY = process.env.NEXT_PUBLIC_PROKEY ?? null

/**
 * This hook returns a function that fetches all the financials for the stock
 * so that they can be exported into a single file
 */
export function useFetchBulk(symbol: string | null, fetchBulk: boolean) {
	const { isPro } = useAuthState()

	async function fetchBulkFinancials() {
		if (!symbol) return null

		if (isPro) {
			let url = `financials-export?s=${symbol}&f=${PRO_KEY}`
			let data = await getData(url)

			if (data && data.data) {
				let returnArray = buildReturnArray(data.data)
				return returnArray
			}
		}
		return null
	}

	const { data } = useQuery([symbol], () => fetchBulkFinancials(), {
		refetchOnWindowFocus: false,
		enabled: isPro && fetchBulk ? true : false
	})

	return data
}
