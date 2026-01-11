/* eslint-disable react-hooks/exhaustive-deps */
import { supabase } from './supabase/supabase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { authState } from 'state/authState'
import { useEvent } from '../hooks/useEvent'

export function useAuth() {
	const user = authState(state => state.user)
	const setUser = authState(state => state.setUser)
	const isLoggedIn = authState(state => state.isLoggedIn)
	const setIsLoggedIn = authState(state => state.setIsLoggedIn)
	const isPro = authState(state => state.isPro)
	const setIsPro = authState(state => state.setIsPro)
	const checked = authState(state => state.checked)
	const setChecked = authState(state => state.setChecked)
	const checking = authState(state => state.checking)
	const setChecking = authState(state => state.setChecking)
	const { event: logEvent } = useEvent()
	const router = useRouter()

		useEffect(() => {
		// subscribe to login and logout events
		// auth state is stored in localstorage and cookies
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				setUser(session?.user)
				setIsLoggedIn(true)
				checkPro(session?.user)
				toast.success('You are now logged in.')
				logEvent('Log_In')
			}
			if (event === 'SIGNED_OUT') {
				setUser(undefined)
				setIsLoggedIn(false)
				toast.success('You have successfully logged out.')
				logEvent('Log_Out')
			}
		})

		if (!checking) {
			setChecking(true)
			checkUser()
		}

		return () => authListener?.subscription.unsubscribe()
	}, [])

	// Get the user info from Supabase (fast)
	// The user info is stored in localStorage so this is instant
	async function checkUser() {
		const { data: { user: userCheck } } = await supabase.auth.getUser()

		// if user is logged in
		if (userCheck) {
			setUser(userCheck)
			setIsLoggedIn(true)
			await checkPro(userCheck)
		}
		setChecked(true)
	}

	// Check the users's subscription status (slow)
	// The user's database row is queried to get the subscription status and
	// other info, then added to the "user" object
	// - enable access to Pro features
	// - hide ads
	async function checkPro(user: any) {
		const { data } = await supabase.from('userdata').select()

		if (data && data[0]) {
			let userdata = data[0] // userdata for the public.userdata table

			if (['trialing', 'active', 'past_due'].includes(userdata.status)) {
				setIsPro(true)
			}

			if (userdata.status === 'deleted' || userdata.status === 'paused') {
				let stopDate = userdata.cancelled_date ?? userdata.paused_date ?? null

				if (stopDate) {
					if (stopDate && new Date() < new Date(stopDate)) {
						setIsPro(true)
					}
				}
			}
		}

		// Update the user with the new info
		let newUser = user
		if (data && data[0]) {
			newUser.data = data[0]
			setUser(newUser)
		}
	}

	// If there is a login error, redirect to the login page and show an error message
	if (router.asPath === '/#error_code=404&error_description=User+not+found') {
		if (typeof window !== 'undefined') {
			window.location.href = '/login/?error=Login+failed'
		}
	}

	return {
		user,
		checked,
		isLoggedIn,
		isPro,
		setIsPro
	}
}
