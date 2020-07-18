const getEnvVariables = () => {
	const isLocal = process.env.NODE_ENV === 'development';
	const isProduction = process.env.NODE_ENV !== 'development';

	return { isLocal, isProduction };
};

const getAppUrl = () => process.env._APP_URL;

export default {
	getAppUrl,
	getEnvVariables,
};
