import { IsEnum, IsNotEmpty, IsOptional, IsArray, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import {
	Currency,
	// Purpose,
	// PropertyType,
	// PropertyUse,
	// SubPropertyType,
	// RoomNumberType,
	Status,
	Location,
} from '../../fireorms/types';

export class PostPropertyValidation {
	@IsNotEmpty()
	@Expose()
	state: string;

	@IsNotEmpty()
	@Expose()
	lga: string;

	@IsNotEmpty()
	@Expose()
	street: string;

	@IsNotEmpty()
	@IsNumber()
	@Expose()
	price: string;

	@IsNotEmpty()
	@Expose()
	title: string;

	@IsNotEmpty()
	// @IsEnum(Purpose)
	@Expose()
	purpose: string;

	@IsNotEmpty()
	// @IsEnum(PropertyUse)
	@Expose()
	propertyUse: string;

	// @IsEnum(PropertyType)
	@Expose()
	propertyType: string;

	//@TODO: is duration really optional ?
	@IsOptional()
	@Expose()
	duration: string;

	//@TODO: make location compulsory when added google maps auto complete from frontend;
	@IsOptional()
	@Expose()
	location: Location;

	@IsOptional()
	// @IsEnum(SubPropertyType)
	@Expose()
	subPropertyType: string;

	@IsOptional()
	// @IsEnum(RoomNumberType)
	@Expose()
	bedrooms: string;

	@IsOptional()
	// @IsEnum(RoomNumberType)
	@Expose()
	toilets: string;

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
	@IsArray()
	@IsEnum(String, {
		each: true,
	})
	@Expose()
	features: string[];

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
	@IsString()
	@Expose()
	price: string;

	@IsOptional()
	@Expose()
	title: string;

	@IsOptional()
	// @IsEnum(Purpose)
	@Expose()
	purpose: string;

	@IsOptional()
	// @IsEnum(PropertyUse)
	@Expose()
	propertyUse: string;

	// @IsEnum(PropertyType)
	@Expose()
	propertyType: string;

	//@TODO: is duration really optional ?
	@IsOptional()
	@Expose()
	duration: string;

	//@TODO: make location import when added google maps auto complete from frontend;
	@IsOptional()
	@Expose()
	location: Location;

	@IsOptional()
	// @IsEnum(SubPropertyType)
	@Expose()
	subPropertyType: string;

	@IsOptional()
	// @IsEnum(RoomNumberType)
	@Expose()
	bedrooms: string;

	@IsOptional()
	// @IsEnum(RoomNumberType)
	@Expose()
	toilets: string;

	@IsOptional()
	@Expose()
	description: string;

	@IsOptional()
	@Expose()
	additionalInfo: string;

	@IsOptional()
	// @IsEnum(Status)
	@Expose()
	status: string;

	@IsOptional()
	@IsEnum(String, {
		each: true,
	})
	@IsOptional()
	@Expose()
	features: string[];

	@IsOptional()
	@IsEnum(Currency)
	@Expose()
	currency: Currency;
}
