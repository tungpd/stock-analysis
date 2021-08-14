import Link from 'next/link';
import { navState } from 'state/navState';

export const ActionsNavigation = () => {
	const path = navState((state) => state.path);

	return (
		<nav className="border-b-[3px] border-blue-brand_sharp">
			<ul className="navmenu">
				<li>
					<Link href="/actions/" prefetch={false}>
						<a
							data-title="Actions"
							className={
								!path.two || path.two === '#' ? 'active' : 'inactive'
							}
						>
							Actions
						</a>
					</Link>
				</li>
				<li>
					<Link href="/actions/changes/" prefetch={false}>
						<a
							data-title="Changes"
							className={path.two === 'changes' ? 'active' : 'inactive'}
						>
							Changes
						</a>
					</Link>
				</li>
				<li>
					<Link href="/actions/spinoffs/" prefetch={false}>
						<a
							data-title="Spinoffs"
							className={path.two === 'spinoffs' ? 'active' : 'inactive'}
						>
							Spinoffs
						</a>
					</Link>
				</li>
				<li>
					<Link href="/actions/splits/" prefetch={false}>
						<a
							data-title="Splits"
							className={path.two === 'splits' ? 'active' : 'inactive'}
						>
							Splits
						</a>
					</Link>
				</li>
				<li>
					<Link href="/actions/delisted/" prefetch={false}>
						<a
							data-title="Delisted"
							className={path.two === 'delisted' ? 'active' : 'inactive'}
						>
							Delisted
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};
