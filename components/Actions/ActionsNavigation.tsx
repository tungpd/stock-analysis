import { useRef } from 'react'
import Link from 'next/link'
import { useLayoutContext } from 'components/Layout/LayoutContext'
import { actionsState } from 'state/actionsState'
import { Router } from 'next/router'

export const ActionsNavigation = () => {
	const { path } = useLayoutContext()
	const menuref = useRef<HTMLUListElement>(null)
	const pos = actionsState(state => state.pos)
	const setPos = actionsState(state => state.setPos)

	Router.events.on('routeChangeStart', () => {
		setPos(menuref.current?.scrollLeft || 0)
	})

	Router.events.on('routeChangeComplete', () => {
		if (menuref.current) {
			menuref.current.scrollLeft = pos || 0
		}
	})

	const tabs = ['listed', 'delisted', 'splits', 'changes', 'spinoffs', 'bankruptcies', 'acquisitions']

	return (
        <nav className="border-b-[3px] border-blue-brand_sharp">
            <ul className="navmenu" ref={menuref}>
				<li>
					<Link
                        href={`/actions/${path.three ? `${path.three}/` : ''}`}
                        prefetch={false}
                        data-title="Actions"
                        className={!path.two || path.two.includes('20') ? 'active' : 'inactive'}>
						
							Actions
						
					</Link>
				</li>
				{tabs.map(tab => {
					let append = ''
					const last = path.three ?? path.two ?? path.one
					if ((last?.includes('20') || last?.includes('19')) && path.two !== tab) {
						append = `${last}/`
					}

					return (
                        <li key={tab}>
                            <Link
                                href={`/actions/${tab}/${append}`}
                                prefetch={false}
                                data-title={tab[0].toUpperCase() + tab.slice(1)}
                                className={path.two === tab ? 'active' : 'inactive'}>

                                {tab[0].toUpperCase() + tab.slice(1)}

                            </Link>
                        </li>
                    );
				})}
			</ul>
        </nav>
    );
}
