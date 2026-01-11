import Link from 'next/link'
import { useState } from 'react'
import { Error } from 'components/Alerts/Error'
import { SpinnerIcon } from 'components/Icons/Spinner'
import { CrispChat } from 'components/Scripts/CrispChat'
import { useEvent } from 'hooks/useEvent'

type Props = {
	signIn: (email: string) => void
	loading: boolean
	errorMsg: string
}

export function LogIn({ signIn, loading, errorMsg }: Props) {
	const [typed, setTyped] = useState('')
	const { event } = useEvent()

	return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h1 className="text-center text-2xl font-bold text-gray-900 xs:text-3xl">Log in to your account</h1>
				<p className="mt-2 text-center text-smaller font-medium text-gray-600">
					Or{' '}
					<Link
                        href="/pro/"
                        prefetch={false}
                        className="bll"
                        id="tag-upgr-login"
                        onClick={() => event('Free_Trial_Click', { location: 'Login_Page' })}>
						
							start your free 30-day trial
						
					</Link>
				</p>
			</div>
            <div className="mt-6 xs:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				{errorMsg && (
					<>
						<Error message={errorMsg} />
						<CrispChat />
					</>
				)}
				<div className="border border-gray-300 bg-white py-6 px-4 xs:py-8 sm:rounded-lg sm:px-10">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email address
						</label>
						<div className="mt-1">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
								value={typed}
								onChange={e => setTyped(e.target.value)}
								onKeyDown={e => e.key === 'Enter' && signIn(typed)}
							/>
						</div>
					</div>

					<div className="mt-2">
						<button
							type="submit"
							className="flex w-full justify-center rounded-md border border-transparent bg-blue-brand_light py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-brand_sharp focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							disabled={loading}
							onClick={() => {
								signIn(typed)
							}}
						>
							{loading ? (
								<>
									<SpinnerIcon /> Logging in...
								</>
							) : (
								'Log in'
							)}
						</button>
					</div>
				</div>
			</div>
        </>
    );
}
