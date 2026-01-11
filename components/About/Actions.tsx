/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'

export function AboutActions() {
	return (
        <section className="bg-white">
            <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
				<div className="lg:grid lg:grid-cols-3 lg:gap-8">
					<div>
						<h2 className="text-3xl font-bold text-gray-900">What to do next</h2>
						<p className="mt-4 text-lg text-gray-600">
							Reach out to our{' '}
							<Link href="/contact/" prefetch={false} className="bll font-medium">
								customer support
							</Link>{' '}
							if you can't find the answers you are looking for.
						</p>
					</div>
					<div className="mt-12 lg:col-span-2 lg:mt-0">
						<div className="space-y-12">
							<div>
								<div className="text-xl font-medium leading-6 text-gray-900">Are you a serious investor?</div>
								<div className="mt-2 text-lg text-gray-600">
									Consider upgrading to{' '}
									<Link href="/pro/" prefetch={false} className="bll font-medium">
										Stock Analysis Pro
									</Link>{' '}
									for even more data and unlimited export ability.
								</div>
							</div>
							<div>
								<div className="text-xl font-medium leading-6 text-gray-900">Are you a developer?</div>
								<div className="mt-2 text-lg text-gray-600">
									Help us code the site on{' '}
									<a
										href="https://github.com/stockanalysisdev"
										target="_blank"
										rel="noopener noreferrer"
										className="bll font-medium"
									>
										GitHub
									</a>{' '}
									or check out our{' '}
									<Link href="/apis/" prefetch={false} className="bll font-medium">
										API and data offerings
									</Link>
									.
								</div>
							</div>
							<div>
								<div className="text-xl font-medium leading-6 text-gray-900">
									See something that can be improved?
								</div>
								<div className="mt-2 text-lg text-gray-600">
									We are committed to the absolute highest standards of data accuracy. If you see anything that
									looks inaccurate,{' '}
									<Link href="/contact/" prefetch={false} className="bll font-medium">
										send us a message
									</Link>{' '}
									and we will look into it immediately.
								</div>
							</div>
							<div>
								<div className="text-xl font-medium leading-6 text-gray-900">
									Want to keep up-to-date with the latest news?
								</div>
								<div className="mt-2 text-lg text-gray-600">
									In that case, you can subscribe to our newsletter or follow our site on{' '}
									<a
										href="https://github.com/stockanalysisdev"
										target="_blank"
										rel="noopener noreferrer"
										className="bll font-medium"
									>
										Facebook
									</a>
									,{' '}
									<a
										href="https://twitter.com/stock_analysisx"
										target="_blank"
										rel="noopener noreferrer"
										className="bll font-medium"
									>
										Twitter
									</a>{' '}
									or{' '}
									<a
										href="https://www.linkedin.com/company/stock-analysis"
										target="_blank"
										rel="noopener noreferrer"
										className="bll font-medium"
									>
										Linkedin
									</a>
									.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        </section>
    );
}
