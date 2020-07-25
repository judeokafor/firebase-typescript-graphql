import app from './server';
import utils from './utils';
import triggers from './triggers';

const { firebase } = utils;
const { functions } = firebase;
const { generateSignedUrl } = triggers.storage;

exports.api = functions.region('europe-west1').https.onRequest(app);

exports.generateSignedUrlOnDocumentUpload = functions
	.region('europe-west1')
	.storage.object()
	.onFinalize(generateSignedUrl);
