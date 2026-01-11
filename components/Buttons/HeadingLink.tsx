import { ChevronRightIcon } from 'components/Icons/ChevronRightIcon'
import { cn } from 'functions/helpers/classNames'
import Link from 'next/link'

type Props = {
	url: string
	title: string
	classes?: string
}

export function HeadingLink({ url, title, classes }: Props) {
	return (
        <Link
            href={url}
            prefetch={false}
            className={cn('flex items-center hover:underline', classes ? classes : '')}>

            <h2 className="mb-0.5 text-xl font-bold leading-tight bp:text-2xl bp:leading-tight md:mb-1">{title}</h2>
            <ChevronRightIcon className="h-5 w-5" />

        </Link>
    );
}
