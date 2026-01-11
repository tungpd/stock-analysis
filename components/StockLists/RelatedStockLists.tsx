import Link from 'next/link'

type Props = {
	lists: { name: string; url: string }[]
}

export function RelatedStockLists({ lists }: Props) {
	return (
        <div>
            <h2 className="mb-2 whitespace-nowrap pl-0.5 text-lg font-semibold tiny:text-xl bp:text-2xl">
				Related Categories
			</h2>
            <div className="flex flex-wrap gap-3 whitespace-nowrap border-t border-gray-200 pt-3">
				{lists.map(list => (
					<Link
                        href={list.url}
                        key={list.url}
                        prefetch={false}
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-200 xs:py-2 xs:text-base">

                        {list.name}

                    </Link>
				))}
			</div>
        </div>
    );
}
