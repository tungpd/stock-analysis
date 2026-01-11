import Link from 'next/link'
import { InformationCircleIcon } from 'components/Icons/InformationCircle'

export function LaterExplanation() {
	return (
        <div className="pb-1 lg:pb-0">
            <h2 className="hh2 mb-3 text-[1.4rem] font-semibold text-gray-800 lg:mb-4">After Next Week</h2>
            <div className="rounded border border-gray-300 bg-white p-3 sm:p-4">
				<div className="flex-row items-center sm:flex sm:space-x-4">
					<div className="float-left mr-1 shrink-0 sm:mr-0 sm:block">
						<InformationCircleIcon classes="h-6 sm:h-7 w-6 sm:w-7 text-blue-400" />
					</div>
					<div className="flex-1 sm:ml-3 md:flex md:justify-between">
						<p className="text-base text-gray-900 md:text-lg">
							No IPOs have been scheduled after next week. The reason is that IPO dates are rarely set more than
							7-10 days in advance.{' '}
							<Link href="/ipos/filings/" prefetch={false} className="bll">
								View unscheduled IPOs
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
        </div>
    );
}
