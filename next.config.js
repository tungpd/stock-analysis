// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withPlausibleProxy } = require('next-plausible')

module.exports = withPlausibleProxy()({
	trailingSlash: true,
	async redirects() {
		return [
			{
				source: '/ipos/2021-list/',
				destination: '/ipos/2021/',
				permanent: true
			},
			{
				source: '/ipos/2020-list/',
				destination: '/ipos/2020/',
				permanent: true
			},
			{
				source: '/ipos/2019-list/',
				destination: '/ipos/2019/',
				permanent: true
			},
			{
				source: '/ipos/2020-list/%20',
				destination: '/ipos/2020/',
				permanent: true
			},
			{
				source: '/stocks/wp-login.php',
				destination: '/stocks/',
				permanent: true
			},
			{
				source: '/etf/wp-login.php',
				destination: '/etf/',
				permanent: true
			},
			{
				source: '/stock-screener/',
				destination: '/screener/stock/',
				permanent: true
			},
			{
				source: '/ipos/screener/',
				destination: '/screener/ipo/',
				permanent: true
			},
			{
				source: '/screener/',
				destination: '/screener/stock/',
				permanent: true
			},
			{
				source: '/author/krisgunnars/',
				destination: '/about/',
				permanent: true
			},
			{
				source: '/list/biggest-social-media-companies/',
				destination: '/list/social-media-stocks/',
				permanent: true
			},
			{
				source: '/list/biggest-banks/',
				destination: '/list/bank-stocks/',
				permanent: true
			},
			{
				source: '/list/biggest-biotech-companies/',
				destination: '/list/biotech-stocks/',
				permanent: true
			},
			{
				source: '/list/biggest-pharmaceutical-companies/',
				destination: '/list/pharmaceutical-stocks/',
				permanent: true
			},
			{
				source: '/list/biggest-semiconductor-companies/',
				destination: '/list/semiconductor-stocks/',
				permanent: true
			},
			{
				source: '/list/biggest-car-companies/',
				destination: '/list/car-company-stocks/',
				permanent: true
			},
			{
				source: '/list/biggest-companies/',
				destination: '/list/biggest-us-companies/',
				permanent: true
			}
		]
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'sameorigin'
					}
				]
			},
			{
				source: '/:all*(ico|jpg|png)',
				locale: false,
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=86400'
					}
				]
			}
		]
	}
})
