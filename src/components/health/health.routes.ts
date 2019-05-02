import express, {NextFunction, Request, Response} from 'express';

import {HealthController} from './health.controller';
import {HttpError} from '../../shared';

const HealthRoutes = express.Router();

HealthController.Instance;

// Get html
HealthRoutes.get('/html', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const sleepDuration: number = req.query.sleepDuration;
		const fallingAsleepTime: number = req.query.fallingAsleepTime;
		const wakingUpTime: string = req.query.wakingUpTime;
		if (!sleepDuration || !fallingAsleepTime || !wakingUpTime) {
			res.send('<strong>Please provide sleepDuration, fallingAsleepTime and wakingUpTime!</strong>');
			return;
		} else {
			const html: any = await HealthController.getHtml(sleepDuration, fallingAsleepTime, wakingUpTime);
			res.status(200).send(html);
		}
	} catch (error) {
		next(new HttpError(500, 'Server Error'));
	}
});

// Get json
HealthRoutes.get('/json', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const sleepDuration: number = req.params.sleepDuration;
		const fallingAsleepTime: number = req.params.fallingAsleepTime;
		const wakingUpTime: string = req.params.wakingUpTime;
		if (!sleepDuration || !fallingAsleepTime || !wakingUpTime) {
			res.send('<strong>Please provide sleepDuration, fallingAsleepTime and wakingUpTime!</strong>');
			return;
		} else {
			const json: any = await HealthController.getJson(sleepDuration, fallingAsleepTime, wakingUpTime);
			res.json(json);
		}
	} catch (error) {
		next(new HttpError(500, 'Server Error'));
	}
});

export {
	HealthRoutes
};
