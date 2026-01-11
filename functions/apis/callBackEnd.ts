import { getData } from 'functions/apis/API'
import { Range, Statement } from 'types/Financials'

const PRO_KEY = process.env.NEXT_PUBLIC_PROKEY ?? null

type Response = {
	status: number
	data: any
}

export function respondSSR(response: Response) {
	if (response.status === 200) {
		return {
			props: response.data
		}
	}

	return response.data
}

export async function getSSR(page: string) {
	const response = await getData(page)
	return respondSSR(response)
}

export async function getPageDataSSR(page: string, symbol: string, type?: 'stocks' | 'etf') {
	const response = type
		? await getData(`${page}?symbol=${symbol}&t=${type}`)
		: await getData(`${page}?symbol=${symbol}`)
	return respondSSR(response)
}

export async function getStockFinancialsSSR(statement: Statement, symbol: string, range: Range) {
	const response = await getData(`financials?type=${statement}&symbol=${symbol}&range=${range}`)
	return respondSSR(response)
}

export async function getChartData(
	abortController: AbortController | undefined,
	symbol: string, // this is the s parameter
	type?: 'stocks' | 'etf', // this is the t parameter
	period?: string, // this is the p parameter
	time?: string, // this is the r parameter.
	candles?: string // this is the f parameter
) {
	let response

	if (!period && !candles) {
		response = await getData(`chart?s=${symbol}&t=${type}&r=${time}`, abortController?.signal)
	} else if (!period) {
		response = await getData(`chart?s=${symbol}&t=${type}&r=${time}&f=${candles}`, abortController?.signal)
	} else {
		response = await getData(`chart?s=${symbol}&t=${type}&p=${period}&r=${time}`, abortController?.signal)
	}

	return response
}

export async function getPageDataFull(page: string, symbol: string) {
	const url = `${page}?s=${symbol}&f=${PRO_KEY}`
	const response = await getData(url)

	if (response.status === 200) {
		return response.data
	}
	return []
}

export async function getStockFinancialsFull(statement: Statement, symbol: string, range: Range) {
	const response = await getData(`financials?type=${statement}&s=${symbol}&f=${PRO_KEY}&range=${range}`)
	if (response.status === 200) {
		return response.data
	}
	return []
}

export async function getMarketNews(type: string) {
	const response = await getData(`news?type=${type}`)
	return response
}

export async function getHomePageData() {
	const response = await getData('homepage')
	// Mock data for dev
	if (!response || Object.keys(response).length === 0) {
		return {
			date: new Date().toISOString().split('T')[0],
			marketStatus: 'closed',
			gainers: [],
			losers: [],
			ipoCalendar: [],
			recentIpos: [],
			news: [],
			trending: [
				{ s: 'AAPL', n: 'Apple Inc.', t: 'stocks' },
				{ s: 'GOOGL', n: 'Alphabet Inc.', t: 'stocks' },
				{ s: 'MSFT', n: 'Microsoft Corp.', t: 'stocks' }
			]
		}
	}
	return response
}

export async function getIpoData(query: string) {
	const response = await getData(`ipos?q=${query}`)
	return response
}

export async function getActionsData(query: string, year?: string) {
	const url = year ? `actions?q=${query}&y=${year}` : `actions?q=${query}`
	const response = await getData(url)
	return response
}

export async function getActionsDataFull(query: string, year?: string) {
	const response = await getData(`actions?q=${query}&y=${year}&f=${PRO_KEY}`)
	return response
}
