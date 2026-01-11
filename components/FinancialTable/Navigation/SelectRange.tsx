import Link from 'next/link'
import { Range, Statement } from 'types/Financials'
import { Info } from 'types/Info'

type Props = {
	info: Info
	statement: Statement
	range: Range
}

const Ranges = [
	{
		title: 'Annual',
		id: 'annual',
		path: ''
	},
	{
		title: 'Quarterly',
		id: 'quarterly',
		path: 'quarterly/'
	},
	{
		title: 'Trailing',
		id: 'trailing',
		path: 'trailing/'
	}
]

export function SelectRange({ info, statement, range }: Props) {
	return (
        <nav>
            <ul className="navmenu submenu">
				{Ranges.map(({ title, id, path }) => {
					let statementPath = statement !== 'income-statement' ? `${statement}/` : ''
					return (
                        <li key={id}>
                            <Link
                                href={`/stocks/${info.symbol}/financials/${statementPath}${path}`}
                                prefetch={false}
                                className={range === id ? 'active' : 'inactive'}
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
