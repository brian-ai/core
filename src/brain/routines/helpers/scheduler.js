import { CronJob } from 'cron'
import { distanceInWordsToNow } from 'date-fns'
import logger from 'hoopa-logger'

const Scheduler = (
	cronTime = '00 30 5 * * 1-5',
	jobName,
	callback,
	start = true
) => {
	const job = new CronJob(cronTime, callback)

	if (start) {
		try {
			job.start()

			logger.info(
				`${jobName} scheduled, time to start: ${distanceInWordsToNow(
					job.nextDate()
				)}`
			)

			setInterval(
				() =>
					logger.info(
						`${jobName} scheduled, time to start: ${distanceInWordsToNow(
							job.nextDate()
						)}`
					),
				300000
			)
		} catch (error) {
			logger.error(`Error while scheduling ${jobName} --error: ${error}`)
		}
	}

	return job
}

export default Scheduler
