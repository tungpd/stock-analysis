import { GetStaticProps } from 'next'
import { LayoutSidebar } from 'components/Layout/LayoutSidebar'
import { SEO } from 'components/SEO'
import { getData } from 'functions/apis/API'
import Link from 'next/link'

type Item = {
	url: string
	title: string
	category?: string
}

function ListItem({ url, title }: Item) {
	return (
        <li>
            <Link href={url} prefetch={false} className="bll text-base md:text-lg">
				{title}
			</Link>
        </li>
    );
}

export default function StockListPage({ data }: { data: any }) {
	return (
		<LayoutSidebar heading="Stock Lists" url="/list/">
			<SEO
				title="Stock Lists"
				description="Lists of stocks that share common characteristics. See companies ranked by market cap, employee count, sales or others."
				canonical="/list/"
			/>
			<div className="mb-8 space-y-6">
				<div>
					<h2 className="hh3 mb-2">Popular Lists</h2>
					<ul className="list-outside list-disc space-y-1 p-1 pl-6 md:columns-2">
						{data
							.filter((f: Item) => f.category === 'popular')
							.map((item: Item) => (
								<ListItem key={item.url} url={`/list/${item.url}/`} title={item.title} />
							))}
					</ul>
				</div>

				<div>
					<h2 className="hh3 mb-2">Stocks Ranked by Market Cap</h2>
					<ul className="list-inside list-disc space-y-1 p-1 md:columns-2">
						{data
							.filter((f: Item) => f.category === 'tag')
							.map((item: Item) => (
								<ListItem key={item.url} url={`/list/${item.url}/`} title={item.title} />
							))}
					</ul>
				</div>
			</div>
		</LayoutSidebar>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await getData('stocklists?type=list')

	return {
		props: {
			data
		},
		revalidate: 3600
	}
}
