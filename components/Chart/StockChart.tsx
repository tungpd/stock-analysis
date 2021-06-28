import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { scaleLinear } from 'd3-scale';
import * as React from 'react';
import {
	elderRay,
	sma,
	discontinuousTimeScaleProviderBuilder,
	Chart,
	ChartCanvas,
	CurrentCoordinate,
	BarSeries,
	CandlestickSeries,
	LineSeries,
	lastVisibleItemBasedZoomAnchor,
	XAxis,
	YAxis,
	CrossHairCursor,
	EdgeIndicator,
	MouseCoordinateY,
	withDeviceRatio,
	withSize,
} from 'react-financial-charts';
import { IOHLCData } from './iOHLCData';
import { HoverTooltipCustom } from '@/components/Chart/HoverTooltipCustom';
import { OHLCTooltipCustom } from '@/components/Chart/OHLCTooltipCustom';
import { MovingAverageTooltipCustom } from '@/components/Chart/MovingAverageTooltipCustom';
import { withOHLCData } from './withOHLCData';
import { current } from 'immer';

interface StockChartProps {
	readonly data: IOHLCData[];
	readonly height: number;
	readonly dateTimeFormat?: string;
	readonly width: number;
	readonly ratio: number;
	readonly loading: boolean;
	readonly type: string;
	readonly period: string;
	readonly time: string;
}

class StockChart extends React.Component<StockChartProps> {
	private readonly dateFormat = timeFormat('%Y-%m-%d');
	private readonly margin = { left: 0, right: 62, top: 0, bottom: 24 };
	private readonly pricesDisplayFormat = format('.2f');
	private readonly volumeDisplayFormat = format('.4s');
	private readonly changeDisplayFormat = format('+.2f');
	private readonly percentDisplayFormat = format('+.2%');

	private readonly xScaleProvider =
		discontinuousTimeScaleProviderBuilder().inputDateAccessor(
			(d: IOHLCData) => d.date
		);

	public render() {
		const {
			data: initialData,
			dateTimeFormat = '%d %b',
			height,
			ratio,
			width,
			type,
		} = this.props;
		const volumeFormatter = format('.2s');
		const disablePan = false;
		const disableZoom = false;

		const candlesAppearance = {
			fill: function fill(d) {
				return d.close > d.open ? 'rgba(30, 130, 76, 1)' : 'rgba(180,0,0)';
			},
			clip: true,
			candleStrokeWidth: 0.5,
			widthRatio: 0.8,
		};

		const openCloseColor = (data) => {
			return data.close > data.open ? '#26a69a' : '#ef5350';
		};

		const priceOrCandleStickColor = (data) => {
			return type == 'line' ? '#000000' : openCloseColor(data);
		};

		const candleChartExtents = (data) => {
			return [data.high, data.low, data.ma1, data.ma2];
		};

		const volChartExtents = (data) => {
			return [data.volume, 0];
		};

		const yEdgeIndicator = (data) => {
			return data.close;
		};
		const volumeColor = (data) => {
			return data.close > data.open
				? 'rgba(38, 166, 154, 0.3)'
				: 'rgba(239, 83, 80, 0.3)';
		};
		const volumeSeries = (data) => {
			return data.volume;
		};

		const sma50 = sma()
			.id(1)
			.options({ windowSize: 50 })
			.merge((d: any, c: any) => {
				d.sma50 = c;
			})
			.accessor((d: any) => d.sma50);

		const sma200 = sma()
			.id(2)
			.options({ windowSize: 200 })
			.merge((d: any, c: any) => {
				d.sma200 = c;
			})
			.accessor((d: any) => d.sma200);

		const elder = elderRay();

		var movingAverageTooltipOptions = [
			{
				yAccessor: (d) => d.ma1,
				type: 'SMA',
				stroke: sma200.stroke(),
				windowSize: sma200.options().windowSize,
			},
			{
				yAccessor: (d) => d.ma2,
				type: 'SMA',
				stroke: sma50.stroke(),
				windowSize: sma50.options().windowSize,
			},
		];

		const calculatedData = elder(sma200(sma50(initialData)));

		const { margin, xScaleProvider } = this;

		const { data, xScale, xAccessor, displayXAccessor } =
			xScaleProvider(calculatedData);

		if (type == 'line') {
			movingAverageTooltipOptions.push({
				yAccessor: (d) => d.close,
				type: 'Price',
				stroke: '#000000',
				windowSize: null,
			});
		}

		const max = xAccessor(data[data.length - 1]);
		let min;
		let days;

		let date: any = new Date(data[data.length - 1].date);

		if (this.props.time == '1Y') {
			days = 365;
		} else if (this.props.time == '1M') {
			days = 31;
		} else if (this.props.time == '6M') {
			days = 183;
		} else if (this.props.time == 'YTD') {
			let YTDdate: any = new Date('01/01/' + new Date().getFullYear());
			let difference = date.getTime() - YTDdate.getTime();
			days = difference / (1000 * 3600 * 24);
		} else if (this.props.time == '3Y') {
			days = 1095;
		} else if (this.props.time == '5Y') {
			days = 1825;
		}
		if (this.props.time != 'MAX') {
			date.setDate(date.getDate() - days);

			for (let i = data.length - 1; -1 < i; i--) {
				let dateIndex: Date = new Date(data[i].date);
				if (date > dateIndex) {
					min = xAccessor(data[i + 1]);
					break;
				}
			}
		} else {
			min = 0;
		}

		/*
		const volumeMax = Math.max.apply(
			Math,
			dataSubset.map(function (o) {
				return o.volume;
			})
		);
		const volumeMin = Math.min.apply(
			Math,
			data.map(function (o) {
				return o.volume;
			})
		);

		const volumeYExtents = [0, volumeMax]; */

		const xExtents = [min, max];

		const gridHeight = height - margin.top - margin.bottom;

		const chartHeight = gridHeight;
		const ma1color = '#2c6288';
		const ma2color = '#c65102';

		if (this.props.loading) {
			return null;
			return (
				<div className="w-full h-full absolute">
					<div className="flex justify-center items-center h-full bg-gray-50 border border-gray-200">
						<svg
							className="animate-spin h-12 w-12 text-blue-500"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
					</div>
				</div>
			);
		}

		return (
			<ChartCanvas
				height={height}
				ratio={ratio}
				width={width}
				margin={margin}
				data={data}
				displayXAccessor={displayXAccessor}
				seriesName="Data"
				disablePan={disablePan}
				disableZoom={disableZoom}
				xScale={xScale}
				xAccessor={xAccessor}
				xExtents={xExtents}
				zoomAnchor={lastVisibleItemBasedZoomAnchor}>
				<Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
					<XAxis showTickLabel={true} />
					<YAxis
						showGridLines={true}
						tickFormat={this.pricesDisplayFormat}
					/>
					{type == 'candlestick' ? (
						<CandlestickSeries {...candlesAppearance} />
					) : (
						<>
							<LineSeries
								yAccessor={(d) => d.close}
								strokeStyle={'#000000'}
							/>
							<CurrentCoordinate
								yAccessor={(d) => d.close}
								fillStyle={priceOrCandleStickColor}
							/>
						</>
					)}

					<LineSeries
						yAccessor={(d) => d.ma1}
						strokeStyle={sma200.stroke()}
					/>
					<CurrentCoordinate
						yAccessor={(d) => d.ma1}
						fillStyle={sma200.stroke()}
					/>
					<LineSeries
						yAccessor={(d) => d.ma2}
						strokeStyle={sma50.stroke()}
					/>
					<CurrentCoordinate
						yAccessor={(d) => d.ma2}
						fillStyle={sma50.stroke()}
					/>

					<MouseCoordinateY
						rectWidth={margin.right}
						displayFormat={this.pricesDisplayFormat}
					/>

					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 20}
						rectHeight={15}
						fill={ma1color}
						orient="right"
						edgeAt="right"
						fontSize={11}
						lineStroke={ma1color}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={sma200.accessor()}
					/>
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 20}
						rectHeight={15}
						hideLine={true}
						fill={ma2color}
						orient="right"
						edgeAt="right"
						fontSize={11}
						lineStroke={ma1color}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={sma50.accessor()}
					/>
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 15}
						fill={priceOrCandleStickColor}
						lineStroke={priceOrCandleStickColor}
						displayFormat={this.pricesDisplayFormat}
						yAccessor={yEdgeIndicator}
						fontSize={13}
					/>
					<OHLCTooltipCustom origin={[5, 15]} />
					<MovingAverageTooltipCustom
						origin={[8, 24]}
						options={movingAverageTooltipOptions}
					/>
					<HoverTooltipCustom
						yAccessor={sma50.accessor()}
						tooltip={{
							content: ({ currentItem, xAccessor }) => ({
								x: this.dateFormat(xAccessor(currentItem)),
								y: [
									{
										label: 'Open',
										value:
											currentItem.open &&
											this.pricesDisplayFormat(currentItem.open),
									},
									{
										label: 'High',
										value:
											currentItem.high &&
											this.pricesDisplayFormat(currentItem.high),
									},
									{
										label: 'Low',
										value:
											currentItem.low &&
											this.pricesDisplayFormat(currentItem.low),
									},
									{
										label: 'Close',
										value:
											currentItem.close &&
											this.pricesDisplayFormat(currentItem.close),
									},
									{
										label: 'Volume',
										value:
											currentItem.volume &&
											this.volumeDisplayFormat(currentItem.volume),
									},
								],
							}),
						}}
					/>
				</Chart>
				<Chart
					id={4}
					height={100}
					origin={(w, h) => [0, h - 100]}
					yExtents={volChartExtents}>
					<BarSeries
						widthRatio={0.5}
						clip={true}
						yAccessor={(d) => d.volume}
						fillStyle={(d) => (d.close > d.open ? '#6BA583' : 'red')}
					/>
					<EdgeIndicator
						itemType="last"
						rectWidth={margin.right - 20}
						rectHeight={15}
						fill={volumeColor}
						orient="right"
						edgeAt="right"
						fontSize={11}
						lineStroke={openCloseColor}
						displayFormat={format('.4s')}
						yAccessor={volumeSeries}
						yAxisPad={0}
					/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}
export default withOHLCData()(
	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
);
export const MinutesStockChart = withOHLCData('MINUTES')(
	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
);
export const SecondsStockChart = withOHLCData('SECONDS')(
	withSize({ style: { minHeight: 600 } })(withDeviceRatio()(StockChart))
);
