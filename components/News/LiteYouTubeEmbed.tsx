// Adapted from here: https://github.com/ibrahimcesar/react-lite-youtube-embed
import { useEvent } from 'hooks/useEvent'
import { useState } from 'react'
import { useInView } from 'react-cool-inview'

type Props = {
	id: string
	title: string
}

export function LiteYouTubeEmbed({ id, title }: Props) {
	const [iframe, setIframe] = useState(false)
	const { event } = useEvent()
	const videoId = encodeURIComponent(id)

	// Lazy load the background image
	// When the div comes into focus, inView becomes true
	const { observe, inView } = useInView({
		rootMargin: '300px',
		unobserveOnEnter: true
	})

	const videoTitle = title
	const background = inView
		? {
				backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`
			}
		: { backgroundColor: '#EEE' }

	const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`

	const addIframe = () => {
		if (iframe) return
		setIframe(true)
		event('Play_Video', { title: videoTitle })
	}

	const inactive = 'yt-lite focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-brand_light rounded-sm'
	const active = 'yt-lite lyt-activated'

	return (
		<div
			ref={observe}
			onClick={addIframe}
			onKeyDown={event => {
				if (event.key === 'Enter') {
					addIframe()
				}
			}}
			className={iframe ? active : inactive}
			data-title={videoTitle}
			style={background}
			tabIndex={0}
		>
			<div className="lty-playbtn"></div>
			{iframe && (
				<iframe
					title={videoTitle}
					width="560"
					height="315"
					frameBorder="0"
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					src={iframeSrc}
				></iframe>
			)}
		</div>
	)
}
