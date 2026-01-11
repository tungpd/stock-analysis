import Link from 'next/link'
import { NavItemProps } from './NavItems.types'
import { matchPath } from 'functions/helpers/matchPath'
import { navMenuState } from 'components/Layout/Navigation/navMenuState'

export function SingleNavItem({ item, path }: NavItemProps) {
	const close = navMenuState(state => state.close)

	return (
        <Link
            href={item.href}
            prefetch={false}
            className={matchPath(path, item.href) ? 'nav-item current group' : 'nav-item group'}
            onClick={close}
            title={item.name}>

            <item.icon className="nav-icon" />
            <span className="nav-label">{item.name}</span>

        </Link>
    );
}
