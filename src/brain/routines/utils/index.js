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
		sentence: `<amazon:auto-breaths>Good ${humanizedTime} sir!!!`
	}
}

export default getGreetingTime
