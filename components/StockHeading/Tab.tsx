import { useLayoutContext } from 'components/Layout/LayoutContext'
import Link from 'next/link'

interface TabI {
	symbol: string
	title: string
	append: string
}

export function Tab({ symbol, title, append }: TabI) {
	const { path } = useLayoutContext()

	return (
        <li>
            <Link
                href={`/stocks/${symbol}/${append ? append + '/' : ''}`}
                prefetch={false}
                className={path.three === append || (!path.three && title === 'Overview') ? 'active' : 'inactive'}
                data-title={title}>

                {title}

            </Link>
        </li>
    );
}
