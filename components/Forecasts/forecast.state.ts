import { create } from 'zustand'

type Charts = 'Bar Chart' | 'Line Chart'
type History = '1 Year' | '2 Years' | '5 Years'

type ForecastState = {
	chartType: Charts
	setChartType: (newChartType: string) => void
	history: History
	setHistory: (newHistory: string) => void
}

export const forecastState = create<ForecastState>(set => ({
	chartType: 'Bar Chart',
	setChartType: (newChartType: any) => set({ chartType: newChartType }),
	history: '1 Year',
	setHistory: (newHistory: any) => set({ history: newHistory })
}))
