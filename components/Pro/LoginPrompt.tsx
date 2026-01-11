import Link from 'next/link'

export const LoginPrompt = () => {
	return (
        <div className="">
            <div className="mb-5 border-b-2 border-gray-900 pb-4 text-2xl font-bold">
				Whoops! This page is only available for logged in users.
			</div>
            <p className="mb-4 text-lg">
				If you already have an account,{' '}
				<Link href="/login/" className="bll">
					login here
				</Link>
				.
			</p>
            <p className="text-lg">
				If not, you can sign up for a free 30-day trial to{' '}
				<Link href="/pro/" className="bll">
					Stock Analysis Pro
				</Link>
				.
			</p>
        </div>
    );
}
