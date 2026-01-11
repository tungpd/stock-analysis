import { tabActive } from 'functions/helpers/tabActive'
import Link from 'next/link'

type Props = {
	url: string
	path: string
	title: string
	lvl?: number
}

export function NavTab({ url, title, path, lvl }: Props) {
	return (
        <li>
            <Link
                href={url}
                prefetch={false}
                data-title={title}
                className={tabActive(path, url, lvl)}>

                {title}

            </Link>
        </li>
    );
}
