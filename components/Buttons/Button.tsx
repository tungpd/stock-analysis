import Link from 'next/link'

interface Props {
	url: string
	text: string
	className?: string
	id?: string
	onClick?: () => void
}

export const Button = ({ url, text, className, id, onClick }: Props) => {
	let classes =
		'inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-lg font-semibold rounded-sm shadow-sm button-blue focus:outline-none focus:ring-2 focus:ring-blue-500 mt-4'
	if (className) {
		classes = classes + ' ' + className
	}

	return (
        <Link href={url} prefetch={false} className={classes} id={id} onClick={onClick}>

            {text}

        </Link>
    );
}
