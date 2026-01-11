import { Logo } from '../Logo'
import Link from 'next/link'
import { Layout } from './_Layout'

type Props = {
	children: React.ReactNode
	url: string
}

export function UserLayout({ children, url }: Props) {
	return (
        <>
            <Layout fullWidth={true} url={url}>
				<div className="mx-auto max-w-[850px] space-y-6 px-6 py-8 sm:py-20 sm:px-0">
					<Link href="/" prefetch={false}>

                        <Logo className="mx-auto mb-6 h-24 w-24 sm:h-28 sm:w-28" />

                    </Link>
					<div className="mx-auto max-w-md">{children}</div>
				</div>
			</Layout>
        </>
    );
}
