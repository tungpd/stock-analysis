import { Button } from 'components/Buttons/Button'
import { UserLayout } from 'components/Layout/UserLayout'
import { useEvent } from 'hooks/useEvent'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { authState } from 'state/authState'

function Error({ statusCode }: any) {
	const isLoggedIn = authState(state => state.isLoggedIn)
	const isPro = authState(state => state.isPro)
	const router = useRouter()
	const { event } = useEvent()

	useEffect(() => {
		event('Error', { statusCode, isPro, isLoggedIn })
	}, [event, isLoggedIn, isPro, statusCode])

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
            <div className="mt-12 text-base">
				{statusCode ? `Server error. Status code: ${statusCode}` : 'Client error.'}
			</div>
            <div className="mt-2 text-base">{router.asPath ? `URL: ${router.asPath}` : ''}</div>
        </UserLayout>
    );
}

Error.getInitialProps = ({ res, err }: any) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}

export default Error
