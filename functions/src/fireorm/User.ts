import * as admin from 'firebase-admin';
import { Collection, getRepository } from 'fireorm';

@Collection('users')
export class User {
	id: string;
	createdAt: admin.firestore.Timestamp;
	createdBy: string;
	email: string;
	firstName: string;
	lastName: string;
	userId: string;
	updatedAt: admin.firestore.Timestamp = admin.firestore.Timestamp.now();
}

export const repository = getRepository(User);
