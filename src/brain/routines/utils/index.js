const getGreetingTime = () => {
	const today = new Date()
	const currenHour = today.getHours()
	let humanizedTime

	if (currenHour < 12) {
		humanizedTime = 'morning'
	} else if (currenHour < 18) {
		humanizedTime = 'afternoon'
	} else {
		humanizedTime = 'evening'
	}

	return {
		humanizedTime,
		sentence: `Good ${humanizedTime}`
	}
}

export default getGreetingTime
