import { authState } from 'state/authState'
import Link from 'next/link'
import { useEvent } from 'hooks/useEvent'

export function FooterCTA() {
	const isPro = authState(state => state.isPro)
	const { event } = useEvent()
	if (isPro) return null

	return (
        <div className="border-t border-gray-200 bg-gray-100">
            <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-16 lg:px-8">
				<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
					<span className="block">Unlimited data, unlimited exports</span>
					<span className="mt-1 block">Start your free trial today.</span>
				</h2>
				<div className="mt-8">
					<div className="inline-flex rounded-md shadow">
						<Link
                            href="/pro/"
                            prefetch={false}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
                            onClick={() => event('Free_Trial_Click', { location: 'Footer CTA' })}>
							
								Get started Now
							
						</Link>
					</div>
				</div>
			</div>
        </div>
    );
}
