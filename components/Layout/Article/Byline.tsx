import Link from 'next/link'
import { formatDateClean } from 'functions/datetime/formatDates'

export const Byline = ({ date }: { date?: string }) => {
	const AboutLink = () => (
		<Link href="/about/" prefetch={false}>
			Kris Gunnars, BSc
		</Link>
	)

	const Date = () => {
		if (date) {
			const formatted = formatDateClean(date)
			return <> | {formatted}</>
		}
		return <></>
	}

	return (
		<div>
			<div className="text-base text-gray-600">
				By <AboutLink />
				<Date />
			</div>
		</div>
	)
}
