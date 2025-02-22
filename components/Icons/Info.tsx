interface IProps {
	classes: string
}

export const InfoIcon = ({ classes }: IProps) => {
	return (
		<svg
			className={classes}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 57.288 122.88"
			fill="currentColor"
			style={{ maxWidth: '40px' }}
		>
			<path
				fillRule="evenodd"
				d="M32.499,0c4.436,0,7.926,1.281,10.468,3.819c2.515,2.53,3.785,6.007,3.785,10.481 c0,4.538-2.163,8.572-6.521,12.11c-4.381,3.538-9.463,5.318-15.254,5.318c-4.352,0-7.812-1.218-10.465-3.66 c-2.651-2.47-3.976-5.665-3.976-9.639c0-5.007,2.163-9.322,6.465-12.987C21.301,1.816,26.465,0,32.499,0L32.499,0z M57.288,122.88 H0v-9.64h10.765V54.36H0v-7.674h26.775c6.763,0,13.418-0.812,19.992-2.47v69.024h10.521V122.88L57.288,122.88z"
				clipRule="evenodd"
			/>
		</svg>
	)
}
