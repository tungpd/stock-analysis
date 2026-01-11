import { ScreenerTypes } from 'components/Screener/screener.types'
import Link from 'next/link'
import { FormatFunction } from 'types/Tables'

type Fn = FormatFunction
type Type = ScreenerTypes

export const dec0 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
})

export const dec1 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1
})

export const dec2 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})

export const dec3 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 3,
	maximumFractionDigits: 3
})

function format(value: number, decimals: 0 | 1 | 2 | 3) {
	if (!value) return '-'
	if (decimals === 0) return dec0.format(value)
	if (decimals === 1) return dec1.format(value)
	if (decimals === 2) return dec2.format(value)
	if (decimals === 3) return dec3.format(value)
	return value
}

export function formatCellRaw(fn: Fn | undefined, value: string | number, type: Type = 'stocks', noDec = false) {
	return formatTableCell(fn, value, type, '', true, noDec)
}

// Inline formatting inside the table loop
export function formatTableCell(
	fn: Fn | undefined,
	value: string | number,
	type: Type = 'stocks',
	symbol = '',
	raw = false,
	noDec = false
) {
	if (!fn) return value
	if (fn === 'linkSymbol') return formatSymbol(value as string, type)
	if (fn === 'linkName') return formatName(value as string, type, symbol)
	if (fn === 'format0dec') return format0dec(value as number)
	if (fn === 'format1dec') return format1dec(value as number)
	if (fn === 'format2dec') return format2dec(value as number)
	if (fn === 'format3dec') return format3dec(value as number)
	if (fn === 'price') return formatPrice(value as number)
	if (fn === 'integer') return formatInteger(value as number)
	if (fn === 'formatPercentage') return formatPercentage(value as number)
	if (fn === 'colorPercentage') return colorPercentage(value as number)
	if (fn === 'abbreviate') return abbreviate(value as number, raw, noDec)
	if (fn === 'formatDate') return formatDate(value as string)
	if (fn === 'string' || fn === 'stringright') return formatString(value as string)
	return null
}

// Turn a symbol into a link to the overview page
export function formatSymbol(value: string, type: ScreenerTypes) {
	let urlPath = type === 'etf' ? 'etf' : 'stocks'
	if (value.startsWith('=')) return value.slice(1)
	let symbol = value.includes('.') ? value : `${value}/`
	let url = `/${urlPath}/${symbol.toLowerCase()}`

	return (
        <Link href={url} prefetch={false}>
            {value}
        </Link>
    );
}

// Turn a name into a link to the overview page
export function formatName(value: string, type: ScreenerTypes, symbol: string) {
	let urlPath = type === 'etf' ? 'etf' : 'stocks'
	let ticker = symbol.includes('.') ? symbol : `${symbol}/`
	let url = `/${urlPath}/${ticker.toLowerCase()}`

	return (
        <div className="string-left">
            <Link href={url} prefetch={false}>
				{value}
			</Link>
        </div>
    );
}

// Format a number with comma but 0 decimal points
export function format0dec(value: number) {
	return format(value, 0)
}

// Format a number with comma but 1 decimal point
export function format1dec(value: number) {
	return format(value, 1)
}

// Format a number with comma and 2 decimal points
export function format2dec(value: number) {
	return format(value, 2)
}

// Format a number with comma and 3 decimal points
export function format3dec(value: number) {
	return format(value, 3)
}

// Format a number with comma and 2 decimal points
export function formatPrice(value: number) {
	if (!value) return '-'
	let formatted = '$' + format(value, 2)
	return <div data-raw={value}>{formatted}</div>
}

// Format an integer with comma and 0 decimal points
export function formatInteger(value: number) {
	if (!value) return '-'
	let formatted = format(value, 0)
	return <div data-raw={value}>{formatted}</div>
}

// Format a percentage with comma and 2 decimal points
export function formatPercentage(value: number) {
	if (!value) return '-'
	let raw = (value / 100).toFixed(3)
	let formatted = format(value, 2) + '%'
	return <div data-raw={raw}>{formatted}</div>
}

// Format percentage growth, with color
export function colorPercentage(value: number) {
	if (!value) return '-'
	let raw = (value / 100).toFixed(3)
	let formatted = format(value, 2) + '%'

	if (value > 0)
		return (
			<div data-raw={raw} className="rg">
				{formatted}
			</div>
		)
	if (value < 0)
		return (
			<div data-raw={raw} className="rr">
				{formatted}
			</div>
		)
	return (
		<div data-raw={raw} className="rgr">
			{formatted}
		</div>
	)
}

// Abbreviate a number with B/M/K
export function abbreviate(value: number, raw: boolean, noDec: boolean) {
	if (!value) return '-'

	let formatter = noDec ? dec0 : dec2

	let num = '-'
	if (value >= 1000000000) num = formatter.format(value / 1000000000) + 'B'
	else if (value >= 1000000) num = formatter.format(value / 1000000) + 'M'
	else if (value > 1000) num = formatter.format(value / 1000) + 'K'
	else if (value <= -1000000000) num = formatter.format(value / 1000000000) + 'B'
	else if (value <= -1000000) num = formatter.format(value / 1000000) + 'M'
	else if (value <= -1000) num = formatter.format(value / 1000) + 'K'
	else num = formatter.format(value)

	return raw ? num : <div data-raw={value}>{num}</div>
}

// Format a date
export function formatDate(value: string) {
	if (!value) return '-'
	if (value === 'n/a') return '-'

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const dt = new Date(value)
	return `${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`
}

// Format a string
export function formatString(value: string) {
	return value || '-'
}
