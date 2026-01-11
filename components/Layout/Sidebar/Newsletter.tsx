import { MailIcon } from 'components/Icons/Mail'
import Link from 'next/link'

export const NewsletterWidget = () => {
	return (
        <div className="rounded border border-gray-200 bg-gray-50 p-6 pb-8 text-center lg:px-7">
            <h3 className="mb-4 text-[1.4rem] font-bold">The Stock Analysis Newsletter</h3>
            <p className="mb-5 text-lg">Get the latest updates in your inbox.</p>
            <form method="post" acceptCharset="UTF-8" action="https://www.aweber.com/scripts/addlead.pl">
				<div className="relative mt-1 mb-3 rounded-md shadow-sm">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<MailIcon classes="h-5 w-5 text-gray-400" />
					</div>
					<input type="hidden" name="meta_web_form_id" value="1291541875" />
					<input type="hidden" name="listname" value="awlist5254312" />
					<input
						type="hidden"
						name="redirect"
						value="https://stockanalysis.com/subscribe/thank-you/"
						id="redirect_1c682bd70a6bff87ede4346cfeb23687"
					/>
					<input type="hidden" name="meta_adtracking" value="Sidebar" />
					<label htmlFor="email-sidebar" className="sr-only">
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email-sidebar"
						autoComplete="email"
						className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-base"
						placeholder="Enter your email"
					/>
				</div>

				<input
					name="submit"
					type="submit"
					value="Subscribe Now"
					className="inline-flex w-full cursor-pointer items-center justify-center rounded-sm border border-transparent bg-blue-brand_light px-6 py-2 text-lg font-semibold text-white shadow-sm hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
				/>
				<div className="mt-1.5 text-sm">
					Read the{' '}
					<Link href="/privacy-policy/" className="bll">
						privacy policy.
					</Link>
				</div>
			</form>
        </div>
    );
}
