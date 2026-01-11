import { FilterValue } from 'react-table'
import dynamic from 'next/dynamic'
import { Filter } from 'components/Controls/Filter'
import { Export } from 'components/Controls/Export'
import { cn } from 'functions/helpers/classNames'

// Load dynamically if rarely used
const SplitsFilter = dynamic(() => import('components/Controls/SplitsFilter'), {
	ssr: false
})

type Props = {
	title: string
	useAsyncDebounce?: (value: any, wait: number) => any
	globalFilter?: any
	setGlobalFilter?: (filterValue: FilterValue) => void
	tableId: string
	setColumnFilter?: (columId: string, updater: any) => void
	setFilterState?: (filterValue: FilterValue) => void
}

export function ActionsControls({
	title,
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
	tableId,
	setColumnFilter,
	setFilterState
}: Props) {
	return (
		<div className="controls groups">
			<div className="title-group">
				<h2 className="whitespace-nowrap text-xl font-semibold bp:text-2xl">{title}</h2>
			</div>
			<div className={cn('btn-group', !setColumnFilter ? 'btn-stretch' : '')}>
				{useAsyncDebounce && setGlobalFilter && (
					<Filter
						useAsyncDebounce={useAsyncDebounce}
						globalFilter={globalFilter}
						setGlobalFilter={setGlobalFilter}
						setFilterState={setFilterState}
					/>
				)}
				{setColumnFilter && <SplitsFilter setColumnFilter={setColumnFilter} />}
				<Export tableId={tableId} />
			</div>
		</div>
	)
}
