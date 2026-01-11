import { create } from 'zustand'

type PaginationState = {
	[key: string]: number
}

type TransientState = {
	page: PaginationState
	setPage: (newPage: PaginationState) => void
}

// This is a temporary state that will be reset on refresh.
// It will also be manually reset when switching between tables.
// Each stock table ID has its own pagination count, so it
// is possible to remember pagination state of many pages at
// a time.
export const transientState = create<TransientState>(set => ({
	page: {},
	setPage: (newPage: PaginationState) => set({ page: newPage })
}))
