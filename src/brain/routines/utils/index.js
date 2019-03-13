const getGreetingTime = (time) => {
	let humanizedTime = null

	if (!time || !time.isValid()) {
		return
	}

	const splitAfternoon = 12
	const splitEvening = 17
	const currentHour = parseFloat(time.format('HH'))

	if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
		humanizedTime = 'afternoon'
	} else if (currentHour >= splitEvening) {
		humanizedTime = 'evening'
	} else {
		humanizedTime = 'morning'
	}

	/* eslint-disable consistent-return */
	return {
		humanizedTime,
		sentence: `<amazon:auto-breaths>Good ${humanizedTime} sir!!`,
	}
}

export default getGreetingTime
