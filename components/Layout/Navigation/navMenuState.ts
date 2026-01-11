import { create } from 'zustand'

type NavMenuState = {
	visible: boolean
	toggle: () => void
	close: () => void
	expanded: boolean
	toggleExpanded: () => void
	expand: () => void
	isOpen: { [key: string]: boolean }
	setIsOpen: (newIsOpen: { [key: string]: boolean }) => void
}
/**
 * The state for the left nav menu
 */
export const navMenuState = create<NavMenuState>(set => ({
	// Whether the menu is visible on mobile/tablet
	visible: false,
	toggle: () => set(state => ({ visible: !state.visible })),
	close: () => set(() => ({ visible: false })),

	// Whether the desktop menu is expanded or collapsed
	expanded: true,
	toggleExpanded: () => set(state => ({ expanded: !state.expanded })),
	expand: () => set(() => ({ expanded: true })),

	// Whether each menu item is open or closed
	isOpen: {},
	setIsOpen: newIsOpen => set({ isOpen: newIsOpen })
}))
