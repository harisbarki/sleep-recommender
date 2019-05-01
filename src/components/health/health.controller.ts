export class HealthController {
	private static _instance: HealthController;

	private constructor() {
	}

	static get Instance() {
		return this._instance || (this._instance = new this());
	}

}
