import { IsEnum, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { FavoriteType } from '../types';

export class FavoritePropertyValidation {
	@IsString({ each: true })
	@Expose()
	favorites: string[];

	@IsEnum(FavoriteType)
	@Expose()
	type: FavoriteType;
}
