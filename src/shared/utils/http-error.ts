import {NextFunction, Request} from 'express';
import * as http from 'http';

/**
 * @export
 * @class HttpError
 * @extends {Error}
 */
export class HttpError extends Error {
	status: number;
	message: string;
	name: 'HttpError';

	/**
	 * Creates an instance of HttpError.
	 * @param {number} [status]
	 * @param {string} [message]
	 * @memberof HttpError
	 */
	constructor(status ?: number, message ?: string) {
		super(message);

		Error.captureStackTrace(this, this.constructor);

		this.status = status || 500;
		this.message = message || http.STATUS_CODES[this.status] || 'Error';
	}
}


/**
 * @exports
 * @param {Request} req
 * @param {*} res
 * @param {NextFunction} next
 *
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      required:
 *        - status
 *        - message
 *      properties:
 *        status:
 *          type: integer
 *          description: HTTP status code
 *          example: 200
 *        message:
 *          type: string
 *          description: Error description
 *          example: User created
 */
export function sendHttpErrorModule(req: Request, res: any, next: NextFunction): void {
	res.sendHttpError = (error: HttpError): void => {
		res.status(error.status);

		/**
		 * if this looks like an AJAX request
		 * if this request has a "json" content-type AND ALSO has its "Accept" header set
		 * if this request DOESN'T explicitly want HTML
		 */
		if (
			req.xhr ||
			req.is('json') ||
			(req.is('json') && req.get('Accept')) ||
			!(req.get('Accept') && req.get('Accept').indexOf('html') !== -1)
		) {
			res.json({
				status: error.status,
				name: error.name,
				message: error.message
			});
		} else {
			res.send(generateHTML(error));
		}
	};

	next();
}

/**
 *
 * @param error Error
 * @returns {string} HTML response or empty string
 * @description generates HTML for response
 */
const generateHTML: Function = (error: HttpError): string => {
	if (error) {
		return '<div style=\'text-align: center;\'>' +
			`<p>Status: ${error.status}</p>` +
			`<p>Name: ${error.name}</p>` +
			`<p>${error}</p>` +
			`</div>`;
	}

	return '';
};

