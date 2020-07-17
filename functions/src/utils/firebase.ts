import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import * as fireorm from 'fireorm';

import config from '../config';

const { adminConfig, firebaseConfig } = config;

const { databaseURL, storageBucket } = firebaseConfig;

admin.initializeApp({
	credential: admin.credential.cert(adminConfig),
	databaseURL,
	storageBucket,
});
firebase.initializeApp(firebaseConfig);

const dbFire = admin.firestore();
const fireStorage = admin.storage();

/** ININITALIZE FIREORM*/
fireorm.initialize(dbFire);

export default {
	admin,
	dbFire,
	fireStorage,
	firebase,
	functions,
};
