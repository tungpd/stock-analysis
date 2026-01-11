import { getSelect } from 'functions/apis/getSelect'
import { useQuery } from '@tanstack/react-query'
import { TableDynamic } from './TableTypes'
import { transientState } from './transient.state'

/**
 * Handle the data for the stock table via react-query
 */
export function useTableData(tableId: string, dynamic: TableDynamic, _data: any[], enabled?: boolean) {
	// The params that  tell react-query when to update
	const { main, count, columns, filters, sortDirection, index } = dynamic
	const page = transientState(state => state.page)
	const queryObject = {
		main,
		count,
		columns,
		filters,
		sortDirection,
		index,
		tableId,
		page: page[tableId]
	}

	const { data, isFetching, error } = useQuery(
		[tableId, queryObject],
		async () => await getSelect(queryObject, false),
		{
			placeholderData: _data,
			enabled: enabled || page[tableId] ? true : false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			staleTime: 60000,
			notifyOnChangeProps: 'tracked',
			keepPreviousData: true,
			retry: false
		}
	)

	// whether the table is paginated and a page is being fetched
	const fetching = isFetching && page[tableId] && page[tableId] !== 1 ? true : false

	return {
		data,
		isFetching: fetching,
		error
	}
}
