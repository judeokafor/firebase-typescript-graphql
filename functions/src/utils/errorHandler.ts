import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from 'http-status-codes';

const ErrorHandler = {
	normalError(res, statusCode, message) {
		return res.status(statusCode).json({ message, status: 'error' });
	},
	tryCatchError(res, error) {
		console.error(error);
		return res.status(INTERNAL_SERVER_ERROR).json({
			message: error.message,
			status: 'error',
		});
	},
	validationError(res, message) {
		return res.status(BAD_REQUEST).json({ message, status: 'error' });
	},
};

export default ErrorHandler;
