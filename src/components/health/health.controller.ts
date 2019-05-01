import moment from 'moment';

export class HealthController {
	private static _instance: HealthController;
	private static sleepCycle: number = 90;

	private constructor() {
	}

	static get Instance() {
		return this._instance || (this._instance = new this());
	}

	static getHtml(sleepDuration: number, fallingAsleepTime: number, wakingUpTime: string) {
		return new Promise((resolve, reject) => {
			console.log('sleepDuration', sleepDuration, ' , fallingAsleepTime', fallingAsleepTime, ' , wakingUpTime', wakingUpTime);
			let html = '<strong>To wake up at the end of a sleep cycle, go to sleep at:</strong><br>';

			const wakeupTimeMoment = moment(wakingUpTime, 'h:mm A');
			html += `<br>`;

			// go through 6 cycles
			for (let i = 6; i > 0; i--) {
				const wakeupTimeMomentCopy = moment(wakeupTimeMoment);
				const totalCycleMinutes = i * HealthController.sleepCycle;
				const sleepTime = wakeupTimeMomentCopy.subtract(totalCycleMinutes, 'minutes');
				const amountOfSleepHours = wakeupTimeMoment.diff(sleepTime, 'hours');
				const amountOfSleepMinutes = wakeupTimeMoment.diff(sleepTime, 'minutes') % 60;
				sleepTime.subtract(fallingAsleepTime, 'minutes');

				if (i === 5) {
					html += '<strong>';
				}

				html += `${sleepTime.format('h:mm A')} (${i} cycles, ${amountOfSleepHours}h`;
				if (amountOfSleepMinutes > 0) {
					html += `${amountOfSleepMinutes}m`;
				}
				html += ` of sleep)`;
				if (i === 6) {
					html += ' - recommended for long-sleepers';
				} else if (i === 5) {
					html += ' - recommended for average-sleepers</strong>';
				} else if (i === 4) {
					html += ' - recommended for short-sleepers';
				}
				html += `<br>`;
			}

			resolve(html);
		});
	}

	static getJson(sleepDuration: number, fallingAsleepTime: number, wakingUpTime: string) {
		return new Promise((resolve, reject) => {
			resolve({data: 'hello'});
		});
	}

}
