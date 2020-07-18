import { IsEnum, IsDefined, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
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
} from '../../fireorms/types';

export class PostPropertyValidation {
	@IsDefined()
	@Expose()
	postedBy: string;

	@IsDefined()
	@Expose()
	state: string;

	@IsDefined()
	@Expose()
	lga: string;

	@IsDefined()
	@Expose()
	street: string;

	@IsDefined()
	@Expose()
	price: string;

	@IsDefined()
	@Expose()
	title: string;

	@IsDefined()
	@IsEnum(Purpose)
	@Expose()
	purpose: Purpose;

	@IsDefined()
	@IsEnum(PropertyUse)
	@Expose()
	propertyUse: PropertyUse;

	@IsEnum(PropertyType)
	@Expose()
	propertyType: PropertyType;

	//@TODO: is duration really optional ?
	@IsOptional()
	@Expose()
	duration: string;

	//@TODO: make location import when added google maps auto complete from frontend;
	@IsOptional()
	@Expose()
	location: Location;

	@IsOptional()
	@IsEnum(SubPropertyType)
	@Expose()
	subPropertyType: SubPropertyType;

	@IsOptional()
	@IsEnum(RoomNumberType)
	@Expose()
	bedrooms: RoomNumberType;

	@IsOptional()
	@IsEnum(RoomNumberType)
	@Expose()
	toilets: RoomNumberType;

	@IsOptional()
	@Expose()
	description: string;

	@IsOptional()
	@Expose()
	additionalInfo: string;

	@IsOptional()
	@IsEnum(Status)
	@Expose()
	status: Status;

	@IsOptional()
	@IsEnum(Features, {
		each: true,
	})
	@IsOptional()
	@Expose()
	features: Features[];

	@IsOptional()
	@IsEnum(Currency)
	@Expose()
	currency: Currency;
}
export class EditPropertyValidation {
	@IsOptional()
	@Expose()
	state: string;

	@IsOptional()
	@Expose()
	lga: string;

	@IsOptional()
	@Expose()
	street: string;

	@IsOptional()
	@Expose()
	price: string;

	@IsOptional()
	@Expose()
	title: string;

	@IsOptional()
	@IsEnum(Purpose)
	@Expose()
	purpose: Purpose;

	@IsOptional()
	@IsEnum(PropertyUse)
	@Expose()
	propertyUse: PropertyUse;

	@IsEnum(PropertyType)
	@Expose()
	propertyType: PropertyType;

	//@TODO: is duration really optional ?
	@IsOptional()
	@Expose()
	duration: string;

	//@TODO: make location import when added google maps auto complete from frontend;
	@IsOptional()
	@Expose()
	location: Location;

	@IsOptional()
	@IsEnum(SubPropertyType)
	@Expose()
	subPropertyType: SubPropertyType;

	@IsOptional()
	@IsEnum(RoomNumberType)
	@Expose()
	bedrooms: RoomNumberType;

	@IsOptional()
	@IsEnum(RoomNumberType)
	@Expose()
	toilets: RoomNumberType;

	@IsOptional()
	@Expose()
	description: string;

	@IsOptional()
	@Expose()
	additionalInfo: string;

	@IsOptional()
	@IsEnum(Status)
	@Expose()
	status: Status;

	@IsOptional()
	@IsEnum(Features, {
		each: true,
	})
	@IsOptional()
	@Expose()
	features: Features[];

	@IsOptional()
	@IsEnum(Currency)
	@Expose()
	currency: Currency;
}
