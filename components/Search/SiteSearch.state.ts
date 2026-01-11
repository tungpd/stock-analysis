import { create } from 'zustand'

type Trending = { s: string; n: string; t: 's' | 'e' }

type SearchState = {
	fetched: boolean
	setFetched: (newFetched: boolean) => void
	trending: Trending[]
	setTrending: (newTrending: Trending[]) => void
}

export const searchState = create<SearchState>(set => ({
	fetched: false,
	setFetched: newFetched => set({ fetched: newFetched }),
	trending: [],
	setTrending: newTrending => set({ trending: newTrending })
}))
