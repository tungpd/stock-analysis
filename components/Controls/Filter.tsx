import { useState, useEffect } from 'react'
import { FilterValue } from 'react-table'
import { CloseIcon } from 'components/Icons/Close'

interface Props {
	useAsyncDebounce: (value: any, wait: number) => any
	globalFilter: any
	setGlobalFilter: (filterValue: FilterValue) => void
	setFilterState?: (filterValue: FilterValue) => void
	filterText?: string
}

export function Filter({
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
	setFilterState,
	filterText = 'Filter...'
}: Props) {
	const [value, setValue] = useState<string | undefined>(globalFilter || undefined)

	const setFilterValues = useAsyncDebounce((value: string | undefined) => {
		if (setGlobalFilter) setGlobalFilter(value)
		if (setFilterState) setFilterState(value)
	}, 100)

	useEffect(() => {
		if (value) setFilterValues(value)
	}, [setFilterValues, value])

	return (
		<div className="filter">
			<label htmlFor="filter" className="sr-only">
				Filter results
			</label>
			<input
				type="text"
				name="filter"
				id="filter"
				value={value || ''}
				onChange={e => {
					setValue(e.target.value)
					setFilterValues(e.target.value)
				}}
				placeholder={filterText}
			/>
			{globalFilter && globalFilter.length > 0 && (
				<div className="absolute right-[7px] xs:right-[10px]">
					<span
						aria-label="Clear"
						title="Clear"
						tabIndex={0}
						onClick={() => {
							setValue('')
							setFilterValues('')
						}}
						onKeyPress={e => {
							if (e.key === 'Enter') {
								setValue('')
								setFilterValues('')
							}
						}}
					>
						<CloseIcon classes="h-4 w-4 xs:h-5 xs:w-5 text-gray-600 hover:text-blue-500" />
					</span>
				</div>
			)}
		</div>
	)
}
