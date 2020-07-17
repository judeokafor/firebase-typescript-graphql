import * as admin from 'firebase-admin';
import { runTransaction } from 'fireorm';
import { User } from 'fireorms';

import utils from 'utils';

const { User: UserModel } = User;
const { fireStorage } = utils.firebase;

const generateSignedUrl = async object => {
	const filePath = object.name;
	const [fieldName, identityId] = filePath.split('/');
	const bucket = fireStorage.bucket();
	const bucketFile = bucket.file(filePath);

	const publicUrls = await bucketFile.getSignedUrl({
		action: 'read',
		expires: '03-17-2040',
	});

	const signedUrl = publicUrls[0];

	await runTransaction(async trans => {
		const userRepo = trans.getRepository(UserModel);
		const user = await userRepo.findById(identityId);
		if (!user) {
			//run for property fields update here;
		}

		return userRepo.update({
			...user,
			[fieldName]: signedUrl,
			id: identityId,
			updatedAt: admin.firestore.Timestamp.now(),
		});
	});
};
export default {
	generateSignedUrl,
};
