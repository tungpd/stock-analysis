import { create } from 'zustand'

interface AuthState {
	checked: boolean
	setChecked: (newChecked: boolean) => void

	isLoggedIn: boolean
	setIsLoggedIn: (newIsLoggedIn: boolean) => void

	isPro: boolean
	setIsPro: (newIsPro: boolean) => void

	user: any
	setUser: (newUser: any) => void

	checking: boolean
	setChecking: (newChecking: boolean) => void
}

export const authState = create<AuthState>(set => ({
	// If pro status has been checked
	checked: false,
	setChecked: newChecked => set({ checked: newChecked }),

	// If user is logged in
	isLoggedIn: false,
	setIsLoggedIn: newIsLoggedIn => set({ isLoggedIn: newIsLoggedIn }),

	// If user is pro
	isPro: false,
	setIsPro: newIsPro => set({ isPro: newIsPro }),

	// User details
	user: null,
	setUser: newUser => set({ user: newUser }),

	// Whether pro status is being checked
	checking: false,
	setChecking: newChecking => set(state => ({ ...state, checking: newChecking }))
}))
