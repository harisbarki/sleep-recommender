export class HealthController {
	private static _instance: HealthController;

	private constructor() {
	}

	static get Instance() {
		return this._instance || (this._instance = new this());
	}

	static getHtml(sleepDuration: number, fallingAsleepTime: number, wakingUpTime: Date) {
		return new Promise((resolve, reject) => {
			resolve('<h1>hello</h1>');
		});
	}

	static getJson(sleepDuration: number, fallingAsleepTime: number, wakingUpTime: Date) {
		return new Promise((resolve, reject) => {
			resolve({data: 'hello'});
		});
	}

}
