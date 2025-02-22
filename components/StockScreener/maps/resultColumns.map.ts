import {
	ColumnName,
	ColumnsMap,
	FilterId,
	ScreenerTypes
} from 'components/StockScreener/screener.types'

export const defaultColumnsStocks: FilterId[] = [
	's',
	'n',
	'm',
	'p',
	'c',
	'i',
	'v',
	'pe'
]
export const defaultColumnsIPOs: FilterId[] = [
	's',
	'n',
	'm',
	'i',
	'ipoPriceRange',
	'ipoDate',
	'revenue'
]
export const defaultColumnsETFs: FilterId[] = [
	's',
	'n',
	'assetClass',
	'aum',
	'p',
	'c',
	'v',
	'holdings'
]

const resultColumnsStocks: ColumnsMap = {
	General: defaultColumnsStocks,
	Filtered: ['s', 'n', 'm'],
	Performance: [
		's',
		'n',
		'm',
		'p',
		'c',
		'ch1m',
		'ch6m',
		'chYTD',
		'ch1y',
		'ch3y',
		'ch5y'
	],
	Financials: [
		's',
		'n',
		'm',
		'revenue',
		'operatingIncome',
		'netIncome',
		'fcf',
		'eps'
	],
	Valuation: ['s', 'n', 'm', 'ev', 'pe', 'fpe', 'ps', 'pb', 'pfcf'],
	Dividends: ['s', 'n', 'm', 'dps', 'dy', 'pr', 'dg', 'payoutFrequency'],
	Analysts: ['s', 'n', 'm', 'ar', 'ac', 'p', 'pt', 'ptc']
}

const resultColumnsIPOs: ColumnsMap = {
	General: defaultColumnsIPOs,
	Filtered: ['s', 'n', 'm'],
	Company: [
		's',
		'n',
		'm',
		'se',
		'i',
		'country',
		'exchange',
		'employees',
		'founded'
	],
	Income: [
		's',
		'n',
		'm',
		'revenue',
		'grossProfit',
		'operatingIncome',
		'netIncome',
		'eps',
		'ebit',
		'ebitda'
	],
	'Balance Sheet': [
		's',
		'n',
		'm',
		'cash',
		'assets',
		'debt',
		'liabilities',
		'equity'
	],
	'Cash Flow': ['s', 'n', 'm', 'ocf', 'icf', 'cff', 'ncf', 'capex', 'fcf']
}

const resultColumnsETFs: ColumnsMap = {
	General: defaultColumnsETFs,
	Filtered: ['s', 'n', 'aum'],
	Performance: [
		's',
		'n',
		'aum',
		'p',
		'c',
		'ch1m',
		'ch6m',
		'chYTD',
		'ch1y',
		'ch3y',
		'ch5y'
	],
	Dividends: [
		's',
		'n',
		'aum',
		'dps',
		'dy',
		'dg',
		'pr',
		'exDivDate',
		'payoutFrequency'
	]
}

export function returnResultColumns(type: string, name: ColumnName) {
	if (type == 'stocks') {
		return resultColumnsStocks[name]
	} else if (type === 'ipo') {
		return resultColumnsIPOs[name]
	} else if (type === 'etf') {
		return resultColumnsETFs[name]
	}
	return resultColumnsStocks[name]
}

export function returnDefaultColumns(type: ScreenerTypes) {
	if (type === 'stocks') {
		return defaultColumnsStocks
	} else if (type === 'ipo') {
		return defaultColumnsIPOs
	} else if (type === 'etf') {
		return defaultColumnsETFs
	}
	return defaultColumnsStocks
}

export function returnFilteredColumns(type: ScreenerTypes): FilterId[] {
	if (type === 'stocks') {
		return ['s', 'n', 'm']
	} else if (type === 'ipo') {
		return ['s', 'n', 'm']
	} else if (type === 'etf') {
		return ['s', 'n', 'aum']
	}
	return ['s', 'n', 'm']
}
