import moment from 'moment';
import { Request, Response, NextFunction } from 'express';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, UNAUTHORIZED } from 'http-status-codes';

import utils from 'utils';
import { User } from 'fireorms';

const { repository: UserRepo } = User;
const { normalError } = utils.errorHandler;
const { admin } = utils.firebase;

const authorization = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
			const idToken = req.headers.authorization.split('Bearer ')[1];
			const { exp, uid } = await admin.auth().verifyIdToken(idToken);

			if (exp > moment().unix()) {
				const user = await UserRepo.findById(uid);

				if (user) {
					req.body.user = user;
					return next();
				}
			}

			return normalError(res, UNAUTHORIZED, 'Unauthorized, refresh token');
		}

		return normalError(res, FORBIDDEN, 'Unauthorized');
	} catch (error) {
		return normalError(res, INTERNAL_SERVER_ERROR, error.message);
	}
};

export default authorization;
