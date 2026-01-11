import { useLayoutContext } from 'components/Layout/LayoutContext'
import Link from 'next/link'
import { SearchItem } from './search.types'

interface Props {
	index: number
	result: SearchItem
	setOpen: (open: boolean) => void
}

export const SingleResult = ({ index, result, setOpen }: Props) => {
	const { path } = useLayoutContext()
	const symbol = result.s
	const name = result.n
	const type = result.t

	let url: string | undefined
	let tag: string | undefined

	switch (type) {
		case 's':
			url = symbol.includes('.') ? `/stocks/${symbol.toLowerCase()}` : `/stocks/${symbol.toLowerCase()}/`
			tag = 'Stock'
			break

		case 'e':
			url = `/etf/${symbol.toLowerCase()}/`
			tag = 'ETF'
			break
	}

	if (!url) {
		return <></>
	} else {
		if (path.three) {
			url = url.includes('.') ? url + '/' : url
			switch (path.three) {
				case 'chart':
					url = `${url}chart/`
					break

				case 'financials':
					{
						if (type === 's') {
							let rangePath = path.five ? `${path.five}/` : ''
							switch (path.four) {
								case 'balance-sheet':
									url = `${url}financials/balance-sheet/${rangePath}`
									break

								case 'cash-flow-statement':
									url = `${url}financials/cash-flow-statement/${rangePath}`
									break

								case 'ratios':
									url = `${url}financials/ratios/${rangePath}`
									break

								default:
									rangePath = path.four ? `${path.four}/` : ''
									url = `${url}financials/${rangePath}`
									break
							}
						}
					}
					break

				case 'company':
					if (type === 's') {
						url = `${url}company/`
					}
					break

				case 'statistics':
					if (type === 's') {
						url = `${url}statistics/`
					}
					break

				case 'forecast':
					if (type === 's') {
						url = `${url}forecast/`
					}
					break

				case 'holdings':
					if (type === 'e') {
						url = `${url}holdings/`
					}
					break

				case 'dividend':
					url = `${url}dividend/`
					break
			}
		}
	}

	let searchResultStyles =
		'flex flex-row items-center gap-x-1 sm:gap-x-2 py-1.5 px-2 sm:px-3 hover:bg-gray-100 transition duration-100'
	if (index === 0) {
		searchResultStyles += ' activeresult'
	}

	return (
        <li className="border-b border-gray-200 first:border-t last:border-none">
            <Link
                href={url}
                prefetch={false}
                data-num={index + 1}
                className={searchResultStyles}
                onClick={() => setOpen(false)}>

                <span className="min-w-[3rem]">{symbol}</span>
                <span className="grow">{name}</span>
                <span className="hidden text-sm sm:block">{tag}</span>

            </Link>
        </li>
    );
}
