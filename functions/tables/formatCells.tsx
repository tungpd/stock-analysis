import { ScreenerTypes } from 'components/Screener/screener.types'
import { cn } from 'functions/helpers/classNames'
import Link from 'next/link'
import { CellNumber, CellString, FormatFunction } from 'types/Tables'

type Fn = FormatFunction
type Cell = CellNumber | CellString
type Type = ScreenerTypes

const dec0 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0
})

const dec2 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
})

const dec3 = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 3,
	maximumFractionDigits: 3
})

function format(value: number, decimals: 0 | 2 | 3) {
	if (!value) return '-'
	if (decimals === 0) return dec0.format(value)
	if (decimals === 2) return dec2.format(value)
	if (decimals === 3) return dec3.format(value)
	return value
}

export function formatHeader(fn: Fn, value: string) {
	if (value === 'Price') return <div className="text-right">{value}</div>
	return value
}

export function formatCells(fn: Fn, cell: Cell, type: Type = 'stocks', appendClass = '') {
	if (fn === 'linkSymbol') return formatSymbol(cell as CellString, type)
	if (fn === 'linkName') return formatName(cell as CellString, type)
	if (fn === 'format2dec') return format2dec(cell as CellNumber)
	if (fn === 'price') return formatPrice(cell as CellNumber)
	if (fn === 'integer') return formatInteger(cell as CellNumber)
	if (fn === 'formatPercentage') return formatPercentage(cell as CellNumber)
	if (fn === 'colorPercentage') return colorPercentage(cell as CellNumber)
	if (fn === 'abbreviate') return abbreviate(cell as CellNumber, appendClass)
	if (fn === 'formatDate') return formatDate(cell as CellString)
	if (fn === 'string') return formatString(cell as CellString)
	return null
}

// Turn a symbol into a link to the overview page
export function formatSymbol(cell: CellString, type: ScreenerTypes) {
	let urlPath = type === 'etf' ? 'etf' : 'stocks'
	let { value } = cell.cell
	if (value.startsWith('=')) return value.slice(1)
	let symbol = value.includes('.') ? value : `${value}/`
	let url = `/${urlPath}/${symbol.toLowerCase()}`

	return (
        <Link href={url} prefetch={false}>
            {value}
        </Link>
    );
}

// Turn a symbol into a link to the overview page
export function formatName(cell: any, type: ScreenerTypes) {
	let urlPath = type === 'etf' ? 'etf' : 'stocks'
	let { value } = cell.cell
	let ticker = cell.row.values.s
	let symbol = ticker.includes('.') ? ticker : `${ticker}/`
	let url = `/${urlPath}/${symbol.toLowerCase()}`

	return (
        <div className="string-left">
            <Link href={url} prefetch={false}>
				{value}
			</Link>
        </div>
    );
}

// Format a number with comma and 2 decimal points
export function format2dec(cell: CellNumber) {
	let { value } = cell.cell
	return <div className="text-right">{format(value, 2)}</div>
}

// Format a number with comma and 2 decimal points
export function formatPrice(cell: CellNumber) {
	let { value } = cell.cell
	return value ? '$' + format(value, 2) : '-'
}

// Format an integer with comma and 0 decimal points
export function formatInteger(cell: CellNumber) {
	let { value } = cell.cell
	return <div className="text-right">{format(value, 0)}</div>
}

// Format a percentage with comma and 2 decimal points
export function formatPercentage(cell: CellNumber) {
	let { value } = cell.cell
	if (!value)
		return (
			<div title="n/a" className="text-right">
				-
			</div>
		)
	let raw = format(value, 3)
	let formatted = format(value, 2) + '%'
	return (
		<div title={raw.toString()} className="text-right">
			{formatted}
		</div>
	)
}

// Format percentage growth, with color
export function colorPercentage(cell: CellNumber) {
	let { value } = cell.cell

	if (!value)
		return (
			<div title="n/a" className="text-right">
				-
			</div>
		)

	let raw = format(value, 3)
	let formatted = format(value, 2) + '%'

	let divclass = 'rgr'
	if (value > 0) divclass = 'rg'
	else if (value < 0) divclass = 'rr'

	return (
		<div title={raw.toString()} className={divclass}>
			{formatted}
		</div>
	)
}

// Abbreviate a number with B/M/K
export function abbreviate(cell: CellNumber, appendClass: string) {
	let { value } = cell.cell
	if (!value)
		return (
			<div title="n/a" className="text-right">
				-
			</div>
		)

	let num = ''
	if (value >= 1000000000) num = dec2.format(value / 1000000000) + 'B'
	else if (value >= 1000000) num = dec2.format(value / 1000000) + 'M'
	else if (value > 1000) num = dec2.format(value / 1000) + 'K'
	else if (value <= -1000000000) num = dec2.format(value / 1000000000) + 'B'
	else if (value <= -1000000) num = dec2.format(value / 1000000) + 'M'
	else if (value <= -1000) num = dec2.format(value / 1000) + 'K'
	else num = dec2.format(value)

	return (
		<div title={dec0.format(value)} className={cn('text-right', appendClass)}>
			{num}
		</div>
	)
}

// Format a date
export function formatDate(cell: CellString) {
	let { value } = cell.cell
	if (!value) return <div className="text-right">-</div>

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

	const dt = new Date(value)
	return <div className="tr">{`${months[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`}</div>
}

// Format a string
export function formatString(cell: CellString) {
	let { value } = cell.cell
	return <div className="string-left">{value || '-'}</div>
}
