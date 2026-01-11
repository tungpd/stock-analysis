import Link from 'next/link'

interface Props {
	text: string
	url?: string
	className?: string
	id?: string
	onClick?: () => void
}

export function ButtonWhite({ text, url, className, id, onClick }: Props) {
	let classes =
		'inline-flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-lg font-semibold rounded-sm shadow-sm text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4'

	if (className) {
		classes = classes + ' ' + className
	}

	if (onClick) {
		return (
			<div className={classes} id={id} onClick={onClick}>
				{text}
			</div>
		)
	}

	return (
        <Link href={url || '#'} prefetch={false} className={classes} id={id}>

            {text}

        </Link>
    );
}
