import Link from 'next/link'
import { StockLink } from 'components/Links'
import { HeadingLink } from 'components/Buttons/HeadingLink'

type IposMin = {
	date: string
	symbol: string
	name: string
}

interface Props {
	recent: IposMin[]
	upcoming: IposMin[]
}

export const IPOwidgets = ({ recent, upcoming }: Props) => {
	// Make sure data is an array
	if (!Array.isArray(upcoming)) upcoming = [upcoming]
	if (!upcoming[0]?.date) upcoming = []

	const IPOTable = ({ ipos }: { ipos: IposMin[] }) => {
		return (
			<table className="w-full border border-gray-200 text-sm sm:text-base">
				<thead>
					<tr className="border-b border-t border-gray-200">
						<th className="border-r border-gray-200 py-1.5 px-2 text-left">Date</th>
						<th className="border-r border-gray-200 py-1.5 px-2 text-left">Symbol</th>
						<th className="py-1.5 px-2 text-left">Name</th>
					</tr>
				</thead>
				<tbody>
					{ipos.map((item, index) => {
						if (item.symbol) {
							return (
								<tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
									<td className="whitespace-nowrap border-r border-gray-200 py-1.5 px-2">{item.date}</td>
									<td className="border-r border-gray-200 py-1.5 px-2">
										<StockLink symbol={item.symbol} className="bll" />
									</td>
									<td className="py-1.5 px-2">{item.name}</td>
								</tr>
							)
						}
						return null
					})}
				</tbody>
			</table>
		)
	}

	return (
        <>
            <div className="flex flex-col space-y-6 lg:space-y-8">
				<section className="px-3 xs:px-4 sm:px-5 lg:px-0">
					<HeadingLink url="/ipos/" title="Recent IPOs" classes="mb-1" />
					<IPOTable ipos={recent} />
				</section>
				<section className="px-3 xs:px-4 sm:px-5 lg:px-0">
					<HeadingLink url="/ipos/calendar/" title="Upcoming IPOs" classes="mb-1" />
					{upcoming.length ? (
						<IPOTable ipos={upcoming} />
					) : (
						<div className="w-full border border-gray-200 p-3">
							There are no upcoming IPOs that have been scheduled.{' '}
							<Link href="/ipos/filings/" prefetch={false} className="bll">
								View all IPO filings.
							</Link>
						</div>
					)}
				</section>
			</div>
        </>
    );
}
