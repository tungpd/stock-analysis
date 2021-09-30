import create from 'zustand';
import {
	SingleStock,
	SingleDataPoint,
	FilterId,
} from 'components/StockScreener/screener.types';
import { mergeColumns } from 'components/StockScreener/functions/mergeColumns';

interface ScreenerDataState {
	data: SingleStock[];
	setData: (data: SingleStock[]) => void;
	addDataColumn: (newColumn: SingleDataPoint[], id: FilterId) => void;
	loaded: boolean;
	setLoaded: (loaded: boolean) => void;
	fullyLoaded: boolean;
	setFullyLoaded: (fullyLoaded: boolean) => void;
	fullCount: number;
	setFullCount: (fullCount: number) => void;
}

export const screenerDataState = create<ScreenerDataState>((set) => ({
	// Data
	data: [],
	setData: (newData: SingleStock[]) =>
		set((state) => ({ ...state, data: newData })),
	addDataColumn: (newColumn: SingleDataPoint[], id: FilterId) =>
		set((state) => ({
			data: mergeColumns(state.data, newColumn, id),
		})),
	loaded: false,
	setLoaded: (newLoaded: boolean) => set({ loaded: newLoaded }),
	fullyLoaded: false,
	setFullyLoaded: (newFullyLoaded: boolean) =>
		set({ fullyLoaded: newFullyLoaded }),
	fullCount: 0,
	setFullCount: (newFullCount: number) => set({ fullCount: newFullCount }),
}));
