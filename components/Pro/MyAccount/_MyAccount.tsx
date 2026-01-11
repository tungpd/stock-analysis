import { formatDateClean } from 'functions/datetime/formatDates'
import { useEvent } from 'hooks/useEvent'
import Link from 'next/link'
import { GetSupport } from './GetSupport'
import { ReActivate } from './Reactivate'

type Props = {
	u?: any
}

export function MyAccount({ u }: Props) {
	const { event } = useEvent()

	let showStatus = ''
	if (u?.status === 'active') showStatus = 'Subscription Active'
	if (u?.status === 'past_due') showStatus = 'Subscription Is Past Due'
	if (u?.status === 'trialing') showStatus = 'Free Trial Active'
	if (u?.status === 'paused') showStatus = 'Subscription Paused'
	if (u?.status === 'deleted') showStatus = 'Subscription Cancelled'
	if (u?.status === 'cancelled') showStatus = 'Subscription Cancelled'

	const sub = u?.status === 'active' || u?.status === 'trialing' ? true : false

	return (
        <>
            <h1 className="mb-5 border-b-2 border-gray-800 pb-4 text-3xl font-bold text-gray-800 xs:text-4xl">
				My Account
			</h1>
            <div className="rounded-md border border-gray-200 p-3 text-base xs:p-4 xs:text-lg">
				<h2 className="hh2">User Information</h2>
				{u?.email && (
					<div>
						<strong>Email Address:</strong> {u?.email}
					</div>
				)}
				{u?.registered_date && (
					<div>
						<strong>Registered Date:</strong> {formatDateClean(u?.registered_date)}
					</div>
				)}
			</div>
            <div className="rounded-md border border-gray-200 p-3 text-base xs:p-4 xs:text-lg">
				<h2 className="hh2">Manage Subscription</h2>
				{showStatus && (
					<div className="mb-2">
						<strong>Status:</strong> {showStatus}
					</div>
				)}
				{sub && u?.next_bill_date && <div>Next Payment Date: {u?.next_bill_date}</div>}
				{sub && u?.next_payment_amount && u?.next_payment_amount !== '0' && (
					<div>
						Amount: {u?.next_payment_amount} {u?.currency && u?.currency}
					</div>
				)}
				{sub && u?.payment_method && (
					<div>Payment Method: {u?.payment_method.charAt(0).toUpperCase() + u?.payment_method.slice(1)}</div>
				)}
				{sub && u?.update_url && (
					<div>
						<a href={u?.update_url} target="_blank" rel="nofollow noopener noreferrer" className="bll">
							Update Payment Details
						</a>
					</div>
				)}
				{sub && u?.cancel_url && (
					<div className="mt-3">
						<Link
                            href="/pro/cancel/"
                            prefetch={false}
                            className="bll"
                            onClick={() => event('Cancel', { step: 'My_Account_Page' })}>
							
								Cancel Subscription
							
						</Link>
					</div>
				)}
				{!sub && <ReActivate email={u?.email} status={u?.status} />}
			</div>
            <GetSupport />
        </>
    );
}
