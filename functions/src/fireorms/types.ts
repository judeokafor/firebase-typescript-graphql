export enum Currency {
	NAIRA = 'NAIRA',
	DOLLAR = 'DOLLAR',
	EURO = 'EURO',
	POUND = 'POUND',
}
export enum Purpose {
	SHORT_STAY = 'SHORT STAY',
	RENT = 'RENT',
	FOR_SALE = 'FOR SALE',
	LEASE = 'LEASE',
}
export enum PropertyUse {
	COMMERCIAL = 'COMMERCIAL',
	RESIDENTIAL = 'RESIDENTIAL',
}

export enum PropertyType {
	WORK_SPACE = 'WORK SPACE',
	FLAT = 'FLAT',
	APARTMENT = 'APARTMENT',
}

export enum SubPropertyType {
	CHURCH = 'CHURCH',
	SCHOOL = 'SCHOOL',
	HOME = 'HOME',
}
export enum RoomNumberType {
	ONE = 1,
	TWO = 2,
	THREE = 3,
	FOUR = 4,
	FIVE = 5,
	SIX = 6,
	SEVEN = 7,
	OTHERS = 'OTHERS',
	NONE = 'NONE',
}
export enum Status {
	AVAILABLE = 'AVAILABLE',
	SOLD = 'SOLD',
	RENTED = 'RENTED',
}
export type Location = {
	lat: number;
	lng: number;
};
export enum Features {
	GARDEN = 'GARDEN',
	SWIMMING_POOL = 'SWIMMING POOL',
} // add more features here
