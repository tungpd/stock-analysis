import Link from 'next/link'

export function GetSupport() {
	return (
        <div className="rounded-md border border-gray-200 p-3 text-base xs:p-4 xs:text-lg">
            <h2 className="hh2">Get Support</h2>
            <div className="mb-4">
				<strong>Here&apos;s how to get support:</strong>
			</div>
            <ol className="ml-8 list-decimal">
				<li className="mb-2">Click the blue chat widget in the bottom right corner.</li>
				<li className="mb-2">Send an email to support@stockanalysis.com.</li>
				<li>
					Send a message via the{' '}
					<Link href="/contact/" prefetch={false} className="bll">
						contact form
					</Link>
					.
				</li>
			</ol>
        </div>
    );
}
