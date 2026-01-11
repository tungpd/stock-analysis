import Link from 'next/link'
import { Range, Statement } from 'types/Financials'
import { Info } from 'types/Info'

type Props = {
	info: Info
	statement: Statement
	range: Range
}

const Statements = [
	{
		title: 'Income',
		id: 'income-statement',
		path: ''
	},
	{
		title: 'Balance Sheet',
		id: 'balance-sheet',
		path: 'balance-sheet/'
	},
	{
		title: 'Cash Flow',
		id: 'cash-flow-statement',
		path: 'cash-flow-statement/'
	},
	{
		title: 'Ratios',
		id: 'ratios',
		path: 'ratios/'
	}
]

export function SelectStatement({ info, statement, range }: Props) {
	return (
        <nav>
            <ul className="navmenu submenu">
				{Statements.map(({ title, id, path }) => {
					let rangePath = range !== 'annual' ? `${range}/` : ''

					return (
                        <li key={id}>
                            <Link
                                href={`/stocks/${info.symbol}/financials/${path}${rangePath}`}
                                prefetch={false}
                                className={statement == id ? 'active' : 'inactive'}
                                data-title={title}>

                                {title}

                            </Link>
                        </li>
                    );
				})}
			</ul>
        </nav>
    );
}
