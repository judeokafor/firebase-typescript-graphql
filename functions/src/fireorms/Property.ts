import * as admin from 'firebase-admin';
import { Collection, getRepository } from 'fireorm';

import {
	Currency,
	Purpose,
	PropertyType,
	PropertyUse,
	SubPropertyType,
	RoomNumberType,
	Status,
	Features,
	Location,
} from './types';

@Collection('properties')
export class Property {
	id: string;
	postedBy: string;
	state: string;
	lga: string;
	street: string;
	currency: Currency = Currency.NAIRA;
	price: string;
	title: string;
	purpose: Purpose;
	propertyUse: PropertyUse;
	propertyType: PropertyType;
	location?: Location;
	subPropertyType?: SubPropertyType;
	duration?: number;
	bedrooms?: RoomNumberType;
	toilets?: RoomNumberType;
	bathrooms?: RoomNumberType;
	description?: string;
	imageUrls?: string[];
	status: Status = Status.AVAILABLE;
	isArchived = false;
	additionalInfo?: string;
	features?: Features[];
	createdAt: admin.firestore.Timestamp;
	updatedAt: admin.firestore.Timestamp = admin.firestore.Timestamp.now();
}

export const repository = getRepository(Property);
