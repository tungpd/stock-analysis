import { NavArrowIcon } from 'components/Icons/NavArrow'
import Link from 'next/link'
import { NavItemProps } from './NavItems.types'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'
import { matchPath, matchParentPath } from 'functions/helpers/matchPath'

/**
 * A single nav item that has children, so when toggled it displays a dropdown
 * @param item the navigation item with a name, href, path, icon and children
 * @param path the current page path
 * @returns
 */
export function MenuNavItem({ item, path }: NavItemProps) {
	const isOpen = navMenuState(state => state.isOpen)
	const setIsOpen = navMenuState(state => state.setIsOpen)
	const close = navMenuState(state => state.close)
	const expanded = navMenuState(state => state.expanded)
	const expand = navMenuState(state => state.expand)

	function openClose() {
		let openClosed = isOpen[item.name] ? true : false
		setIsOpen({ ...isOpen, [item.name]: !openClosed })
	}

	return (
        <>
            <div
				className={matchParentPath(path, item.href) ? 'nav-menu-wrap current group' : 'nav-menu-wrap group'}
				onClick={() => {
					if (!expanded) expand()
				}}
			>
				<Link
                    href={item.href}
                    prefetch={false}
                    className={matchParentPath(path, item.href) ? 'nav-item current parent' : 'nav-item parent'}
                    title={item.name}
                    onClick={close}>

                    <item.icon className="nav-icon" />
                    <span className="nav-label">{item.name}</span>

                </Link>
				<div className="nav-arrow-wrap" onClick={openClose}>
					<NavArrowIcon classes={isOpen[item.name] ? 'nav-arrow open' : 'nav-arrow closed'} />
				</div>
			</div>
            {item.children && isOpen[item.name] && expanded && (
				<div className="space-y-0.5">
					{item.children.map(subItem => (
						<Link
                            key={subItem.name}
                            href={subItem.href}
                            prefetch={false}
                            className={matchPath(path, subItem.href) ? 'nav-item current subitem' : 'nav-item subitem'}
                            onClick={close}
                            title={subItem.name}>

                            <span className="nav-label">{subItem.name}</span>

                        </Link>
					))}
				</div>
			)}
        </>
    );
}
