export class HealthController {
	private static _instance: HealthController;
	private sleepCycle: number = 90;

	private constructor() {
	}

	static get Instance() {
		return this._instance || (this._instance = new this());
	}

	static getHtml(sleepDuration: number, fallingAsleepTime: number, wakingUpTime: string) {
		return new Promise((resolve, reject) => {
			console.log('sleepDuration', sleepDuration, ' , fallingAsleepTime', fallingAsleepTime, ' , wakingUpTime', wakingUpTime);
			let html = '<strong>To wake up at the end of a sleep cycle, go to sleep at:</strong><br>';
			html += `Sleep Duration (Hours): ${sleepDuration}<br>`;
			html += `Falling Asleep Time (minutes): ${fallingAsleepTime}<br>`;
			html += `Waking Up Time: ${wakingUpTime}<br>`;
			html += ``;

			resolve(html);
		});
	}

	static getJson(sleepDuration: number, fallingAsleepTime: number, wakingUpTime: string) {
		return new Promise((resolve, reject) => {
			resolve({data: 'hello'});
		});
	}

}
