import { CloseIcon } from 'components/Icons/Close'
import { InformationCircleIcon } from 'components/Icons/InformationCircle'
import { cn } from 'functions/helpers/classNames'
import Link from 'next/link'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { CloseCircleIcon } from 'components/Icons/CloseCircle'
import { useEffect, useState } from 'react'
import { useEvent } from 'hooks/useEvent'

type Props = {
	text: string
	storageKey: string
	docsLink?: string
	classes?: string
}

/**
 * This is an info box that should have a link to a tutorial or documentation page. It can be dismissed by clicking on the x icon, which will be persisted in localStorage.
 */
export function InfoTutorial({ text, storageKey, docsLink, classes }: Props) {
	const [show, setShow] = useLocalStorage(storageKey, true)
	const [showState, setShowState] = useState(true)
	const { event } = useEvent()

	useEffect(() => {
		setShowState(show)
	}, [show])

	if (!showState) return null

	return (
        <div className={cn('relative rounded border border-gray-300 bg-white p-2.5 xs:p-3', classes ? classes : '')}>
            <div className="md:flex md:flex-row md:items-center">
				<div className="float-left mr-1 md:mr-3 md:block">
					<InformationCircleIcon classes="h-4 xs:h-5 md:h-5 w-4 xs:w-5 md:w-5 text-blue-400 mt-0.5 md:mt-0" />
				</div>
				<div>
					<p className="text-smaller text-gray-900 xs:text-base">
						{text}
						{docsLink && (
							<>
								{' '}
								<Link href={docsLink} className="bll">
									Learn more.
								</Link>
							</>
						)}
					</p>
				</div>
				<div
					className="absolute -top-2.5 -right-2.5 bg-white p-0.5 md:hidden"
					onClick={() => setShow(false)}
					title="Dismiss"
				>
					<CloseCircleIcon classes="w-5 h-5 text-gray-600" />
				</div>
				<div
					className="ml-auto hidden cursor-pointer md:block"
					onClick={() => {
						setShow(false)
						event('Dismiss_InfoTutorial')
					}}
					title="Dismiss"
				>
					<CloseIcon classes="w-5 h-5 text-gray-500 hover:text-red-500" />
				</div>
			</div>
        </div>
    );
}
