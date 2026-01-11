import { useEvent } from 'hooks/useEvent'
import Link from 'next/link'

export function UpgradePrompt() {
	const { event } = useEvent()

	return (
        <div className="mt-3 border-l-4 border-yellow-400 bg-yellow-50 p-4 text-yellow-700">
            <div className="flex flex-row items-center">
				<div className="ml-1">
					<span className="text-base">There is no active subscription on this account.</span>{' '}
					<span className="mt-1">
						<Link
                            href="/pro/my-account/"
                            prefetch={false}
                            className="text-base font-medium text-yellow-700 underline hover:text-yellow-600"
                            onClick={() => event('Activate_Now')}>
							
								Activate Now
							
						</Link>
					</span>
				</div>
			</div>
        </div>
    );
}
