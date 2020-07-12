import * as functions from 'firebase-functions';

const { environment } = functions.config().app || {};

const getEnvVariables = () => {
	const isLocal = environment === 'staging';
	const isStaging = environment === 'staging';
	const isProduction = environment === 'production';

	return { isLocal, isProduction, isStaging };
};

const getAppUrl = () => process.env._APP_URL;

export default {
	getAppUrl,
	getEnvVariables,
};
