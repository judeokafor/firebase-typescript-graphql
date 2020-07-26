import { PassThrough } from 'stream';

import firebase from './firebase';
import { ExportFile } from './types';

const { fireStorage } = firebase;

const uploadStream = (uploadData, type = 'propertyImage') => {
	const bucket = fireStorage.bucket();
	const pass = new PassThrough();
	const { fieldname, mimetype, identityId } = uploadData;
	const fileName =
		type === 'propertyImage'
			? `${fieldname}/${identityId}-${Date.now()}`
			: `${fieldname}/${identityId}`;
	const bucketFile = bucket.file(fileName);

	const writeStream = bucketFile.createWriteStream({
		metadata: { contentType: mimetype },
	});

	pass.pipe(writeStream);

	writeStream.on('error', err => {
		// TODO: add anaystics on error
		console.log(err);
	});

	writeStream.on('finish', () => {
		// TODO: add anaystics on success
		console.log(`Successfully uploaded file - ${fileName}`);
	});

	return pass;
};

const upload = async (uploadFiles: ExportFile[], id, type = 'add') => {
	// Handle checking if file already exists
	const bucket = fireStorage.bucket();
	const uploadFilesToFireStoragePromises = [] as Promise<unknown>[];
	const checkUploadFilesPromises: Promise<[boolean]>[] = uploadFiles.map(uploadFile => {
		const { fieldname } = uploadFile;
		const fileName = `${fieldname}/${id}`;
		const bucketFile = bucket.file(fileName);

		return bucketFile.exists();
	});

	try {
		const checkFileExistence = await Promise.all(checkUploadFilesPromises);

		// Upload file only if it doesn't exist
		uploadFiles.forEach((uploadFile, index: number) => {
			const fileExists = checkFileExistence[index] && checkFileExistence[index][0];

			if (!fileExists || (fileExists && type === 'edit')) {
				const { fieldname, file, mimetype } = uploadFile;
				const fileName = `${fieldname}/${id}`;
				const bucketFile = bucket.file(fileName);
				const writeStream = bucketFile.createWriteStream({
					metadata: { contentType: mimetype },
				});

				uploadFilesToFireStoragePromises.push(
					new Promise((resolve, reject) => {
						writeStream.on('error', err => {
							reject(err);
						});
						writeStream.on('finish', () => {
							console.log(`Successfully uploaded file - ${fileName}`);
							resolve();
						});
					})
				);

				file.pipe(writeStream);
			}
		});
	} catch (error) {
		console.log(error);
	}

	return uploadFilesToFireStoragePromises;
};

export default {
	upload,
	uploadStream,
};
