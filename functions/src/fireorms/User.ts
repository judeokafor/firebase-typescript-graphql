import * as admin from 'firebase-admin';
import { Collection, getRepository } from 'fireorm';

export enum UserType {
	AGENT = 'AGENT',
	BUILDER = 'BUILDER',
	OWNER = 'OWNER',
	BUYER = 'BUYER',
}

@Collection('users')
export class User {
	id: string;
	createdBy: string;
	email: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	userType: UserType;
	avatar: string;
	alternativePhoneNumber?: string;
	cac?: string;
	cacNumber?: string;
	logo?: string;
	businessName?: string;
	favoriteProperties?: admin.firestore.FieldValue;
	createdAt: admin.firestore.Timestamp;
	updatedAt: admin.firestore.Timestamp = admin.firestore.Timestamp.now();
}

export const repository = getRepository(User);
