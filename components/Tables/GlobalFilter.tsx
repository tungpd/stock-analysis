import { useState } from 'react'
import { FilterValue } from 'react-table'

interface Props {
	useAsyncDebounce: (value: any, wait: number) => any
	globalFilter: any
	setGlobalFilter: (filterValue: FilterValue) => void
}

export const GlobalFilter = ({ useAsyncDebounce, globalFilter, setGlobalFilter }: Props) => {
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce((value: any) => {
		setGlobalFilter(value || undefined)
	}, 100)

	return (
		<input
			className="block w-full rounded-md border border-gray-300 py-1.5 pl-2 pr-1 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 xs:px-3 xs:text-base sm:py-2"
			value={value || ''}
			onChange={e => {
				setValue(e.target.value)
				onChange(e.target.value)
			}}
			placeholder="Filter..."
		/>
	)
}
