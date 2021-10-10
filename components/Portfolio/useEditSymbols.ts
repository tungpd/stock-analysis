import axios from 'axios';
import { useUserInfo } from 'hooks/useUserInfo';
import { useMutation, useQueryClient } from 'react-query';

export function useEditSymbols(pid: string) {
	const { email, token } = useUserInfo();
	const queryClient = useQueryClient();

	async function post(action: string, item: string) {
		const url = process.env.NEXT_PUBLIC_API_URL + '/portfolio';
		return await axios.post(url, {
			email,
			token,
			action,
			item,
			pid,
		});
	}

	function invalidate() {
		queryClient.invalidateQueries('portfolio');
	}

	const add = useMutation(
		(name: string) => {
			return post('add_symbol', name);
		},
		{
			onSuccess: invalidate,
		}
	);

	return { add };
}
