import { useAd } from 'hooks/useAd';
import { navState } from 'state/navState';
import { authState } from 'state/authState';

export const HeaderAd = () => {
	const path = navState((state) => state.path);
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);

	useAd('header');

	if ((status === 'completed' && isPro) || path.one === null) {
		return null;
	}

	return (
		<>
			<div className="hidden md:block lbl mt-2">
				<div
					className={`md:h-[90px] md:w-[728px] mx-auto${
						process.env.NODE_ENV === 'development' ? ' bg-gray-200' : ''
					}`}
					id="div-gpt-ad-1617185422059-0"
				></div>
			</div>
		</>
	);
};
