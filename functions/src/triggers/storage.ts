import * as admin from 'firebase-admin';
import { runTransaction } from 'fireorm';

import { User, Property } from '../fireorms';

import utils from '../utils';

const { User: UserModel } = User;
const { Property: PropertyModel } = Property;
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
			const propertyRepo = trans.getRepository(PropertyModel);
			const propertyId = identityId.split('-')[0];
			const property = await propertyRepo.findById(propertyId);
			return propertyRepo.update({
				...property,
				[fieldName]: admin.firestore.FieldValue.arrayUnion(signedUrl),
				updatedAt: admin.firestore.Timestamp.now(),
			});
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
