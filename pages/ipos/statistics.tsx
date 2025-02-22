import { GetServerSideProps } from 'next'
import { IpoRecent } from 'types/Ipos'
import { News } from 'types/News'
import { SEO } from 'components/SEO'
import { getIpoData } from 'functions/apis/callBackEnd'
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation'
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs'
import { StatsChartAnnual } from 'components/IPOs/StatsChartAnnual'
import { StatsChartMonthly } from 'components/IPOs/StatsChartMonthly'
import Link from 'next/link'
import { RecentTableMin } from 'components/IPOs/RecentTableMin'
import { NewsWidget } from 'components/News/NewsWidget'
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1'
import { Layout } from 'components/Layout/_Layout'

interface Props {
	data: {
		total: number
		year2021: number
		months2019: [string, number][]
		months2020: [string, number][]
		months2021: [string, number][]
	}
	news: News[]
	recent: IpoRecent[]
}

export const IpoStatistics = ({ data, news, recent }: Props) => {
	return (
		<>
			<SEO
				title="IPO Statistics and Charts"
				description="Statistics and charts for initial public offerings (IPOs) on the US stock market. Annual data is available from 2000-2021 and monthly data for 2019-2021."
				canonical="/ipos/statistics/"
			/>
			<Layout>
				<div className="contain">
					<Breadcrumbs url="/ipos/statistics/" />
					<h1 className="hh1">IPO Statistics</h1>
					<IPONavigation path="statistics" />

					<div className="lg:right-sidebar">
						<div className="flex flex-col space-y-3 py-3 sm:py-4">
							<div>
								<p className="text-base sm:text-lg text-gray-900">
									This page contains statistics and charts for initial
									public offerings (IPOs) on the US stock market.
									Annual data is available from 2000-2021 and monthly
									data since 2019.
								</p>
							</div>
							<div>
								<h2 className="hh2 mb-2">Number of IPOs by Year</h2>
								<p className="text-base sm:text-lg text-gray-900">
									{`There have been ${data.total.toLocaleString(
										'en-US'
									)} IPOs between 2000 and 2021. The least was in 2009 with only 62. The full year 2020 was an all-time record with 480 IPOs, but 2021 has already beat that record with ${
										data.year2021
									} IPOs and counting.`}
								</p>
								<StatsChartAnnual
									title="Annual IPOs, 2000-2021"
									data={data.year2021}
								/>
							</div>
							<div>
								<h2 className="hh2 mb-2">
									2021 Initial Public Offerings
								</h2>
								<p className="text-base sm:text-lg text-gray-900">
									{`There have been ${data.year2021} IPOs so far in 2021.`}{' '}
									<Link href="/ipos/2021/">
										<a className="bll">View all 2021 IPOs.</a>
									</Link>
								</p>
								<StatsChartMonthly
									title="2021 IPOs"
									data={data.months2021}
								/>
							</div>
							<div>
								<h2 className="hh2 mb-2">
									2020 Initial Public Offerings
								</h2>
								<p className="text-base sm:text-lg text-gray-900">
									There were 480 initial public offerings in 2020.
									October had the most with a total of 97 IPOs. March
									had the fewest with only 5.{' '}
									<Link href="/ipos/2020/">
										<a className="bll">View all 2020 IPOs.</a>
									</Link>
								</p>
								<StatsChartMonthly
									title="2020 IPOs"
									data={data.months2020}
								/>
							</div>
							<div>
								<h2 className="hh2 mb-2">
									2019 Initial Public Offerings
								</h2>
								<p className="text-lg">
									There were 232 IPOs in 2019. May and July had the
									most with a total of 30. January had the fewest, with
									only 7.{' '}
									<Link href="/ipos/2019/">
										<a className="bll">View all 2019 IPOs.</a>
									</Link>
								</p>
								<StatsChartMonthly
									title="2019 IPOs"
									data={data.months2019}
								/>
							</div>
						</div>
						<aside className="flex flex-col space-y-10 pt-6">
							<RecentTableMin recent={recent} />
							<Sidebar1 />
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
	)
}

export default IpoStatistics

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	const { data, news, recent } = await getIpoData('statistics')

	res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')

	return {
		props: {
			data,
			news,
			recent
		}
	}
}
