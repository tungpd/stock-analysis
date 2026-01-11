import { create } from 'zustand'
import { DataId } from 'types/DataId'
import {
	SingleStock,
	SingleDataPoint,
	VariableFilter,
	FilterOption,
	ScreenerTypes,
	ColumnName
} from 'components/Screener/screener.types'
import { mergeColumns } from 'components/Screener/functions/mergeColumns'

interface ScreenerState {
	// Type
	type: ScreenerTypes | ''
	setType: (type: ScreenerTypes) => void

	// Data
	data: SingleStock[]
	setData: (data: SingleStock[]) => void
	addDataColumn: (newColumn: SingleDataPoint[], id: DataId) => void
	fullCount: number
	setFullCount: (fullCount: number) => void

	// Loading
	loaded: boolean
	setLoaded: (loaded: boolean) => void
	fetching: DataId[]
	addFetching: (newFetching: DataId) => void
	removeFetching: (newFetching: DataId) => void

	// Filter menu
	filterMenu: string
	setFilterMenu: (newMenu: string) => void
	openFilter: DataId | ''
	setOpenFilter: (newFilter: DataId | '') => void
	filterSearch: string
	setFilterSearch: (newSearch: string) => void
	filtersShown: boolean
	setFiltersShown: (filtersShown: boolean) => void

	// Search filter
	searchFilter: string
	setSearchFilter: (newSearch: string) => void

	// Results
	resultsMenu: ColumnName
	setResultsMenu: (newMenu: ColumnName) => void
	resultsCount: number
	setResultsCount: (newCount: number) => void

	// Variable filters
	variableFilters: VariableFilter[]
	addVariableFilter: (options: FilterOption[], id: DataId) => void
	clearVarFilters: () => void

	// Columns
	fetchedColumns: DataId[]
	addFetchedColumn: (newColumn: DataId) => void
	setFetchedColumns: (newArray: DataId[]) => void
	columnDropdownOpen: boolean
	setColumnDropdownOpen: (open: boolean) => void

	// Pagination
	tablePage: number
	setTablePage: (newTablePage: number) => void
	tableSize: number
	setTableSize: (tableSize: number) => void
}

export const screenerState = create<ScreenerState>(set => ({
	// Type
	type: '',
	setType: (newType: ScreenerTypes) => set({ type: newType }),

	// Data
	data: [],
	setData: (newData: SingleStock[]) => set(state => ({ ...state, data: newData })),
	addDataColumn: (newColumn: SingleDataPoint[], id: DataId) =>
		set(state => ({
			data: mergeColumns(state.data, newColumn, id)
		})),
	fullCount: 0,
	setFullCount: (newFullCount: number) => set({ fullCount: newFullCount }),

	// Loading
	loaded: false,
	setLoaded: (newLoaded: boolean) => set({ loaded: newLoaded }),
	fetching: [],
	addFetching: (newFetching: DataId) =>
		set(state => ({
			...state,
			fetching: [...state.fetching, newFetching]
		})),
	removeFetching: (newFetching: DataId) =>
		set(state => ({
			...state,
			fetching: state.fetching.filter(fetching => fetching !== newFetching)
		})),
	filtersShown: true,
	setFiltersShown: (show: boolean) => set({ filtersShown: show }),

	// Filter Menu
	filterMenu: 'Active',
	setFilterMenu: (newMenu: string) => set({ filterMenu: newMenu, filterSearch: '', filtersShown: true }),
	openFilter: '', // The filter menu that is open
	setOpenFilter: (newFilter: DataId | '') => set({ openFilter: newFilter }),
	filterSearch: '',
	setFilterSearch: (newSearch: string) =>
		set({
			filterSearch: newSearch
		}),

	// Variable filters
	variableFilters: [],
	addVariableFilter: (options: FilterOption[], id: DataId) =>
		set(state => ({
			variableFilters: [...state.variableFilters, { id, options }]
		})),
	clearVarFilters: () => set({ variableFilters: [] }),

	// Search filter
	searchFilter: '',
	setSearchFilter: (newSearch: string) => set({ searchFilter: newSearch }),

	// Results
	resultsMenu: 'General',
	setResultsMenu: (newMenu: ColumnName) => set({ resultsMenu: newMenu }),

	// Results count
	resultsCount: 0,
	setResultsCount: (newCount: number) => set({ resultsCount: newCount }),

	// Columns
	fetchedColumns: [], // All data columns that have been fetched
	addFetchedColumn: (newColumn: DataId) =>
		set(state => ({
			fetchedColumns: [...state.fetchedColumns, newColumn]
		})),
	setFetchedColumns: (newArray: DataId[]) => set({ fetchedColumns: newArray }),
	columnDropdownOpen: false,
	setColumnDropdownOpen: (open: boolean) => set({ columnDropdownOpen: open }),

	// Pagination
	tablePage: 0,
	setTablePage: newTablePage => set({ tablePage: newTablePage }),
	tableSize: 20,
	setTableSize: newTableSize => set({ tableSize: newTableSize })
}))
