import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {HttpError, sendHttpErrorModule} from '../shared/';

export function configure(app: express.Application): void {
	// express configuration
	app.use(morgan('dev'));
	app.use(bodyParser.json({
		type: ['json']
	}));
	app.use(bodyParser.urlencoded({extended: false}));
	app.use(cookieParser());
	// compresses files for response, gzip
	app.use(compression());

	// custom errors
	app.use(sendHttpErrorModule);
}

interface CustomResponse extends express.Response {
	sendHttpError: (error: HttpError | Error, message ?: string) => void;
}

export function initErrorHandler(app: express.Application): void {
	app.use((error: Error, req: express.Request, res: CustomResponse, next: express.NextFunction) => {
		if (typeof error === 'number') {
			error = new HttpError(error); // next(404)
		}

		if (error instanceof HttpError) {
			res.sendHttpError(error);
		} else {
			if (app.get('env') === 'development') {
				error = new HttpError(500, error.message);
				res.sendHttpError(error);
			} else {
				error = new HttpError(500);
				res.sendHttpError(error, error.message);
			}
		}

		console.error(error);
	});
}
