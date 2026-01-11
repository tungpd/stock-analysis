import { GetStaticProps } from 'next'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { getIpoData } from 'functions/apis/callBackEnd'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { StatsChartAnnual } from 'components/IPOs/StatsChartAnnual'
import { StatsChartMonthly } from 'components/IPOs/StatsChartMonthly'
import Link from 'next/link'
import { NewsWidget } from 'components/News/NewsWidget'
import { Layout } from 'components/Layout/_Layout'
import { Sidebar1 } from 'components/Ads/AdSense/Sidebar1'
import { SidebarTable, SidebarTableProps } from 'components/IPOs/SidebarTable'

interface Props {
	data: {
		total: number
		year2022: number
		months2019: [string, number][]
		months2020: [string, number][]
		months2021: [string, number][]
		months2022: [string, number][]
	}
	news: News[]
	recent: SidebarTableProps
}

export const IpoStatistics = ({ data, news, recent }: Props) => {
	const url = '/ipos/statistics/'

	return (
        <>
            <SEO
				title="IPO Statistics and Charts"
				description="Statistics and charts for initial public offerings (IPOs) on the US stock market. Annual data is available from 2000-2022 and monthly data for 2019-2022."
				canonical={url}
			/>
            <Layout url={url}>
				<div className="contain" id="ipos">
					<h1 className="hh1">IPO Statistics</h1>
					<IPONavigation path="statistics" />

					<div className="lg:right-sidebar">
						<div className="flex flex-col space-y-3 py-3 sm:py-4">
							<div>
								<p className="text-base text-gray-900 sm:text-lg">
									This page contains statistics and charts for initial public offerings (IPOs) on the US stock
									market. Annual data is available from 2000-2022 and monthly data since 2019.
								</p>
							</div>
							<div>
								<h2 className="hh2 mb-2">Number of IPOs by Year</h2>
								<p className="text-base text-gray-900 sm:text-lg">
									{`There have been ${data.total.toLocaleString(
										'en-US'
									)} IPOs between 2000 and 2022. The least was in 2009 with only 62. The full year 2021 was an all-time record with 1035 IPOs, beating the previous record of 480 in the year 2020.`}
								</p>
								<StatsChartAnnual title="Annual IPOs, 2000-2022" data={data.year2022} />
							</div>
							<div>
								<h2 className="hh2 mb-2">2022 Initial Public Offerings</h2>
								<p className="text-base text-gray-900 sm:text-lg">
									{`There have been ${data.year2022} IPOs so far in 2022.`}{' '}
									<Link href="/ipos/2022/" prefetch={false} className="bll">
										View all 2022 IPOs.
									</Link>
								</p>
								<StatsChartMonthly title="2022 IPOs" data={data.months2022} />
							</div>
							<div>
								<h2 className="hh2 mb-2">2021 Initial Public Offerings</h2>
								<p className="text-base text-gray-900 sm:text-lg">
									There were 1035 IPOs in 2021, which was an all-time record. March had the most with a total
									of 151, while August had the fewest with only 40 IPOs.{' '}
									<Link href="/ipos/2021/" prefetch={false} className="bll">
										View all 2021 IPOs.
									</Link>
								</p>
								<StatsChartMonthly title="2021 IPOs" data={data.months2021} />
							</div>
							<div>
								<h2 className="hh2 mb-2">2020 Initial Public Offerings</h2>
								<p className="text-base text-gray-900 sm:text-lg">
									There were 480 initial public offerings in 2020. October had the most with a total of 97
									IPOs. March had the fewest with only 5.{' '}
									<Link href="/ipos/2020/" prefetch={false} className="bll">
										View all 2020 IPOs.
									</Link>
								</p>
								<StatsChartMonthly title="2020 IPOs" data={data.months2020} />
							</div>
							<div>
								<h2 className="hh2 mb-2">2019 Initial Public Offerings</h2>
								<p className="text-lg">
									There were 232 IPOs in 2019. May and July had the most with a total of 30. January had the
									fewest, with only 7.{' '}
									<Link href="/ipos/2019/" prefetch={false} className="bll">
										View all 2019 IPOs.
									</Link>
								</p>
								<StatsChartMonthly title="2019 IPOs" data={data.months2019} />
							</div>
						</div>
						<aside className="flex flex-col space-y-10 pt-6">
							<SidebarTable title="Latest IPOs" btnTitle="All Recent IPOs" btnUrl="/ipos/" data={recent} />
							<Sidebar1 key={url} />
							<NewsWidget
								title="IPO News"
								news={news}
								button={{
									text: 'More IPO News',
									url: '/ipos/news/'
								}}
							/>
						</aside>
					</div>
				</div>
			</Layout>
        </>
    );
}

export default IpoStatistics

export const getStaticProps: GetStaticProps = async () => {
	const { data, news, recent } = await getIpoData('statistics')

	return {
		props: {
			data,
			news,
			recent
		},
		revalidate: 30 * 60
	}
}
