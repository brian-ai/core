import Daily from './daily'

const Routines = (player, instance) => {
	return Daily('00 30 5 * * 1-5', 'Daily Job', { player, instance })
}

export default Routines
