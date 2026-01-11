import { cn } from 'functions/helpers/classNames'
import Link from 'next/link'
import { UpDownIcons } from './Blocks/UpDownIcons'
import { MiniChartObject } from './MiniChart.types'
import { MiniChartWrapper } from './MiniChartWrapper'

type Props = {
	title: string
	symbol: string
	type: 'stocks' | 'etf'
	data?: MiniChartObject
}

/**
 * Returns a widget with a sparkline chart
 */
export function MiniChartWidget({ title, symbol, type, data: bulkdata }: Props) {
	const data = bulkdata ? bulkdata[symbol] : undefined

	return (
        <Link href={`/${type}/${symbol.toLowerCase()}/`} prefetch={false}>

            <div className="mcwidget">
                <div>
                    <div className="mctitle">{title}</div>
                    <div className={cn('mcupdown', data ? data.color : '')}>
                        <UpDownIcons color={data?.color} />
                        <div className="mcchange">{data?.percentChange}</div>
                    </div>
                </div>
                <MiniChartWrapper
                    previousClose={data?.previousClose}
                    chart={data?.chart}
                    color={data?.color}
                    isFetching={!data?.chart}
                />
            </div>

        </Link>
    );
}
