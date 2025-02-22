import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => {
	NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
	NProgress.done()
})
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Component {...pageProps} />
		</QueryClientProvider>
	)
}

export default MyApp
