const giveWeatherAdvise = (temp = 18, humanizedTime) => {
	if (parseFloat(temp) < 18) return "You should put a coach because I unfortunatelly can't warm you yet and is freezing outside."
	if (parseFloat(temp) >= 15) return 'You should be okay! today is warm. Enjoy the heat!'

	return `With this time I wish you a good luck in this ${humanizedTime} boss.`
}

export default giveWeatherAdvise
