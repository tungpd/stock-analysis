import { SortObject } from 'components/Screener/screener.types'
import { FilterValue } from 'react-table'
import { create } from 'zustand'

interface TableState {
	tablePage: number
	tableSize: number
	sort: SortObject[]
	filter: FilterValue
	setTablePage: (newTablePage: number) => void
	setTableSize: (tableSize: number) => void
	setSort: (sort: SortObject[]) => void
	setFilter: (newFilter: FilterValue) => void
}

export const tableState = create<TableState>(set => ({
	tablePage: 0,
	tableSize: 500,
	sort: [{ id: 's', desc: true }],
	filter: '',
	setTablePage: newTablePage => set({ tablePage: newTablePage }),
	setTableSize: newTableSize => set({ tableSize: newTableSize }),
	setSort: newSort => set({ sort: newSort }),
	setFilter: newFilter => set({ filter: newFilter })
}))
