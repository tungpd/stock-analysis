import { HeadingLink } from 'components/Buttons/HeadingLink'
import Link from 'next/link'

type NewsMin = {
	t: string
	u: string
	n: string
	d: string
}

export const LatestNews = ({ news }: { news: NewsMin[] }) => (
	<section className="mx-auto px-3 xs:px-4 sm:px-5 lg:col-span-2 lg:px-0">
		<HeadingLink url="/news/" title="Market News" classes="mb-1" />
		<table className="border-t border-gray-200 text-sm sm:text-base">
			<tbody>
				{news.map((item, index) => {
					return (
						<tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
							<td className="pr-1 pt-2 align-top text-gray-600">{item.d}</td>
							<td className="py-2 pl-2">
								<a href={item.u} target="_blank" rel="nofollow noopener noreferrer" className="bll">
									{item.t}
								</a>
								<span className="text-gray-600"> - {item.n}</span>
							</td>
						</tr>
					)
				})}
				<tr className="border-b border-gray-200">
					<td colSpan={2} className="pl-0.5 pt-3 pb-2 text-base font-semibold bp:pl-1 sm:pl-2 sm:text-lg">
						<span className="hidden xs:inline">More News:</span>
						<Link
                            href="/news/"
                            className="bll ml-2 mb-1 inline-flex items-center rounded-md bg-gray-100 px-1.5 py-1 text-sm font-medium hover:bg-gray-200 bp:px-2 sm:ml-2 sm:text-base">
							
								Markets
							
						</Link>
						<Link
                            href="/news/all-stocks/"
                            className="bll ml-2 mb-1 inline-flex items-center rounded-md bg-gray-100 px-1.5 py-1 text-sm font-medium hover:bg-gray-200 bp:px-2 sm:ml-3 sm:text-base">
							
								All Stocks
							
						</Link>
						<Link
                            href="/ipos/news/"
                            className="bll ml-2 mb-1 inline-flex items-center rounded-md bg-gray-100 px-1.5 py-1 text-sm font-medium hover:bg-gray-200 bp:px-2 sm:ml-3 sm:text-base">
							
								IPO News
							
						</Link>
					</td>
				</tr>
			</tbody>
		</table>
	</section>
)
