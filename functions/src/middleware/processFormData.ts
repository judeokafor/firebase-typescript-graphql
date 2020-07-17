import Busboy from 'busboy';

import utils from '../utils';

const { uploadFilesToFireStorage } = utils;
const { uploadStream } = uploadFilesToFireStorage;

export default (req, res, next) => {
	const busboy = new Busboy({ headers: req.headers });
	let { id: identityId } = req.params;
	const fields = {};

	// This code will process each non-file field in the form.
	busboy.on('field', (name, value) => {
		fields[name] = value;
	});
	// This code will process each file uploaded.
	busboy.on('file', async (fieldname, file, filename, _, mimetype) => {
		const { propertyId } = fields as { propertyId: string };
		identityId = propertyId || identityId;

		//@TODO: handle multiple image uploads here; assuming the fieldname is called propertyImages
		// if (fieldname === 'propertyImages') {
		// }

		const uploadData = { fieldname, mimetype, identityId };

		// Upload to firestore
		file.pipe(uploadStream(uploadData)).on('finish', () => {
			console.log('WE DONE BUFFERING:', filename);
		});
	});

	busboy.on('finish', () => {
		req.body = { fields };

		return next();
	});

	busboy.end(req.rawBody);
};
