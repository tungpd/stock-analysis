import { useAuthState } from 'auth/useAuthState'
import { ArrowCTAIcon } from 'components/Icons/ArrowCTA'
import Link from 'next/link'
import { useEvent } from 'hooks/useEvent'

const FeaturesMap: any = {
	pro: {
		title: 'Stock Analysis Pro',
		description: 'Unlimited access to all our financial data with up to 30 years of history.',
		url: '/pro/',
		tagId: 'tag-upgr-nav-widget'
	},
	ipoCalendar: {
		title: 'IPO Calendar',
		description: 'All upcoming IPOs on the stock market with detailed statistics and financials.',
		url: '/ipos/calendar/',
		tagId: 'tag-feat-nav-widget-calendar'
	},
	stockScreener: {
		title: 'Stock Screener',
		description: 'Filter, sort and analyze all stocks to find your next investment.',
		url: '/screener/stock/',
		tagId: 'tag-feat-nav-widget-screener'
	},
	etfScreener: {
		title: 'ETF Screener',
		description: 'Filter, sort and analyze all ETFs to find your next investment.',
		url: '/screener/etf/',
		tagId: 'tag-feat-nav-widget-etfscreener'
	},
	marketNews: {
		title: 'Market News',
		description: "Get the latest news to keep up with what's going on in the markets.",
		url: '/news/',
		tagId: 'tag-feat-nav-widget-news'
	},
	marketMovers: {
		title: 'Market Movers',
		description: 'The stocks that are making the biggest moves in the market.',
		url: '/markets/gainers/',
		tagId: 'tag-feat-nav-widget-movers'
	}
}

type Props = {
	list?: string[]
}

export function Features({ list = ['pro', 'ipoCalendar', 'stockScreener', 'marketMovers'] }: Props) {
	const { isPro } = useAuthState()
	const { event } = useEvent()

	function logEvent(feature: any) {
		if (feature.url === '/pro/') {
			event('Free_Trial_Click', { location: 'Nav_Widget' })
		} else {
			event('Nav_Widget_Click', { type: feature.title })
		}
	}

	return (
        <div className="space-y-3">
            {list.map((feature: any) => {
				if (isPro && FeaturesMap[feature].url === '/pro/') return null
				return (
                    <div
						className="group relative overflow-hidden rounded-lg border bg-white shadow hover:shadow-md"
						key={FeaturesMap[feature].title}
					>
                        <Link
                            href={FeaturesMap[feature].url}
                            prefetch={false}
                            id={FeaturesMap[feature].tagId}
                            onClick={() => logEvent(FeaturesMap[feature])}>

                            <div className="px-4 py-5 sm:p-6">
                                <div className="hh3">{FeaturesMap[feature].title}</div>
                                <div className="text-gray-800">{FeaturesMap[feature].description}</div>
                                <span
                                    className="absolute top-6 right-6 text-gray-300 group-hover:text-blue-400"
                                    aria-hidden="true"
                                >
                                    <ArrowCTAIcon classes="h-6 w-6" />
                                </span>
                            </div>

                        </Link>
                    </div>
                );
			})}
        </div>
    );
}
