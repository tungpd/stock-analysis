import { authState } from 'state/authState';
import { noAds } from 'components/Ads/noAds';
import { useNavState } from 'hooks/useNavState';
import { useEffect, useState } from 'react';

export function HeaderAd() {
	const status = authState((state) => state.status);
	const isPro = authState((state) => state.isPro);
	const { path } = useNavState();
	const [show, setShow] = useState(true);
	const [stat, setStat] = useState(false);

	useEffect(() => {
		setShow(true); // Show ad each time the path is changed
		setStat(false);

		setTimeout(() => {
			// Ad is sticky for 2 seconds
			if (window.scrollY > 0) {
				// Only fade out if user has scrolled
				setShow(false);
				setTimeout(() => {
					// Put ad back in original place after 500ms
					setStat(true);
				}, 500);
			} else {
				setStat(true);
			}
		}, 2000);
	}, [path]);

	if (!noAds(path.one)) {
		if (status !== 'completed' || (status === 'completed' && !isPro)) {
			return (
				<div
					id="ad-banner"
					className={
						show ? 'sticky-head' : stat ? '' : 'sticky-head fade-out'
					}
				>
					<div className="hidden md:block bg-gray-100 pt-1 pb-2 mx-auto text-center">
						<div
							className="md:min-h-[111px] md:max-w-[728px] lg:max-w-[970px] mx-auto text-center center-children"
							id="adngin-top_leaderboard-0"
						></div>
					</div>
				</div>
			);
		}
	}

	return null;
}
