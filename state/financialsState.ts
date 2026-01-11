import { create } from 'zustand'

interface FinancialsState {
	range: 'annual' | 'quarterly' | 'trailing'
	setRange: (newRange: 'annual' | 'quarterly' | 'trailing') => void

	divider: number
	setDivider: (newDivider: number) => void

	reversed: boolean
	toggleReversed: () => void

	trailing: boolean
	toggleTrailing: () => void

	current: boolean
	toggleCurrent: () => void

	controls: boolean
	toggleControls: () => void
}

export const financialsState = create<FinancialsState>(set => ({
	range: 'annual',
	setRange: newRange => set({ range: newRange }),

	divider: 1000000,
	setDivider: newDivider => set({ divider: newDivider }),

	reversed: false,
	toggleReversed: () => set(state => ({ reversed: !state.reversed })),

	trailing: false,
	toggleTrailing: () => set(state => ({ trailing: !state.trailing })),

	current: true,
	toggleCurrent: () => set(state => ({ current: !state.current })),

	controls: false,
	toggleControls: () => set(state => ({ controls: !state.controls }))
}))
