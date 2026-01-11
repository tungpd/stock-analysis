import Link from 'next/link'
import { useLayoutContext } from 'components/Layout/LayoutContext'

type Props = {
	symbol: string
}

export const TabNavigationETF = ({ symbol }: Props) => {
	const { path } = useLayoutContext()

	return (
        <nav className="w-full border-b-2 border-blue-brand_sharp">
            <ul className="navmenu w-full">
				<li>
					<Link
                        href={`/etf/${symbol}/`}
                        prefetch={false}
                        className={!path.three ? 'active' : 'inactive'}
                        data-title="Overview">
						
							Overview
						
					</Link>
				</li>
				<li>
					<Link
                        href={`/etf/${symbol}/holdings/`}
                        prefetch={false}
                        className={path.three == 'holdings' ? 'active' : 'inactive'}
                        data-title="Holdings">
						
							Holdings
						
					</Link>
				</li>
				<li>
					<Link
                        href={`/etf/${symbol}/dividend/`}
                        prefetch={false}
                        className={path.three == 'dividend' ? 'active' : 'inactive'}
                        data-title="Dividend">
						
							Dividend
						
					</Link>
				</li>
				<li>
					<Link
                        href={`/etf/${symbol}/chart/`}
                        prefetch={false}
                        className={path.three == 'chart' ? 'active' : 'inactive'}
                        data-title="Chart">
						
							Chart
						
					</Link>
				</li>
			</ul>
        </nav>
    );
}
