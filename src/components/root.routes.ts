import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
// Routes
// organization routes must be first as it is initializing some config vars
import {HealthRoutes} from './health/health.routes';

import {config} from '../shared';

export function setupRoutes(app: express.Application) {
	const ApiRoutes = express.Router();

	// for testing
	app.use(cors({credentials: true, origin: config.cors.origin}));

	app.use((req: Request, res: Response, next: NextFunction) => {
		res.header('Access-Control-Allow-Origin', config.cors.origin);
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
		res.header('Access-Control-Allow-Credentials', 'true');
		next();
	});

	// we can later put versions on the api e.g. api/v1/
	app.use('/api', ApiRoutes);	// everything encapsulates within api/
	ApiRoutes.use('/health', HealthRoutes);

	/* Everything else */
	app.get('*', (req: Request, res: Response) => {
		console.log('API Only');
		res.send('<h1>API Only</h1>');
	});
}
