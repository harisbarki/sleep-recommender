import express, {NextFunction, Request, Response} from 'express';
import {HealthController} from './health.controller';
import {HttpError} from '../../shared';

const HealthRoutes = express.Router();

HealthController.Instance;

// Get all
HealthRoutes.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		// const organizations: IOrganizationModel[] = await HealthController.getOrganizations();

		// res.status(200).json(organizations);
		res.json('hellloooo');
	} catch (error) {
		next(new HttpError(500, 'Server Error'));
	}
});

export {
	HealthRoutes
};
