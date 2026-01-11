import { Button } from 'components/Buttons/Button'
import { UserLayout } from 'components/Layout/UserLayout'
import { useEvent } from 'hooks/useEvent'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * Fallback to display if there is an uncaught error.
 * Log the error event and display a debug message.
 */
export function ErrorFallback(props: any) {
	const router = useRouter()
	const { event } = useEvent()

	useEffect(() => {
		event('Error', { type: props.props?.error?.message, details: props.props?.error?.stack })
	}, [event, props.props?.error])

	return (
        <UserLayout url={router.asPath}>
            <Head>
				<title>An error occurred | Stock Analysis</title>
			</Head>
            <div className="hh1 mb-2">An error occurred</div>
            <div className="mt-5 leading-relaxed lg:text-xl">
				Our admins will attempt to fix the error as soon as possible. If you need it fixed immediately, please send
				us a message via the{' '}
				<Link href="/contact/" prefetch={false} className="bll">
					contact form
				</Link>{' '}
				or email us directly at support@stockanalysis.com.
			</div>
            <Button text="Back to home page" url="/" className="mt-8" />
            <div className="mt-6 text-xs text-gray-500">{props.props?.error?.message}</div>
            <div className="mt-2 overflow-x-hidden text-xs text-gray-500">
				{props.props?.error?.stack?.substring(0, 800)}
			</div>
        </UserLayout>
    );
}
