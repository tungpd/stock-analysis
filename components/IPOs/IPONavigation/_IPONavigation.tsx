import Link from 'next/link'

export function IPONavigation({ path }: { path: string }) {
	return (
        <div className="mb-1">
            <div>
				<nav className="mb-1.5 border-b-[3px] border-blue-brand_sharp">
					<ul className="navmenu">
						<li>
							<Link
                                href="/ipos/"
                                prefetch={false}
                                data-title="IPOs"
                                className={!path ? 'active' : 'inactive'}>
								
									Recent
								
							</Link>
						</li>
						<li>
							<Link
                                href="/ipos/calendar/"
                                prefetch={false}
                                data-title="Calendar"
                                className={path === 'calendar' ? 'active' : 'inactive'}>
								
									Calendar
								
							</Link>
						</li>
						<li>
							<Link
                                href="/ipos/statistics/"
                                prefetch={false}
                                data-title="Statistics"
                                className={path === 'statistics' ? 'active' : 'inactive'}>
								
									Statistics
								
							</Link>
						</li>
						<li>
							<Link
                                href="/ipos/news/"
                                prefetch={false}
                                data-title="News"
                                className={path === 'news' ? 'active' : 'inactive'}>
								
									News
								
							</Link>
						</li>
					</ul>
				</nav>
			</div>
        </div>
    );
}
