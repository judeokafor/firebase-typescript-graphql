import { PassThrough } from 'stream';

import firebase from './firebase';

const { fireStorage } = firebase;

export type UploadDataType = { fieldname: string; id: string; mimetype: string };

const upload = async (uploadFiles: UploadDataType[], type = 'add') => {
	const pass = new PassThrough();

	// Handle checking if file already exists

	const bucket = fireStorage.bucket();
	const uploadFilesToFireStoragePromises = [] as Promise<unknown>[];
	const checkUploadFilesPromises: Promise<[boolean]>[] = uploadFiles.map(uploadFile => {
		const { fieldname, id } = uploadFile;
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
				const bucket = fireStorage.bucket();
				const { fieldname, mimetype, id } = uploadFile;
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

				pass.pipe(writeStream);
			}
		});
	} catch (error) {
		console.log(error);
	}

	return uploadFilesToFireStoragePromises;
};

export default {
	upload,
};
