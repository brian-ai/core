import Daily from './daily'

const Routines = player => {
	return Daily('00 30 5 * * 1-5', 'Daily Job', player)
}

export default Routines
