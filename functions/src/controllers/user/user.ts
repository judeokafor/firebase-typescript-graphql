import { OK } from 'http-status-codes';
import { Request, Response } from 'express';
import { runTransaction } from 'fireorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import utils from '../../utils';
import { User } from '../../fireorms';
import { FavoritePropertyValidation } from './validations';

import { AuthClaimType, FavoriteData, FavoriteType } from '../types';

const { User: UserModel, repository: UserRepo } = User;
const { errorHandler, successHandler } = utils;
const { tryCatchError, validationError } = errorHandler;
const { successNoData } = successHandler;
const { admin } = utils.firebase;

const UserController = {
	/**
	 *
	 * @param req Request body
	 * @param res Response body
	 * Handles creating user details and setting auth claims;
	 * this method assumes that the user has been registered from the frontend and expects the uid sent
	 */
	async createNewUser(req: Request, res: Response) {
		const { uid, firstName, lastName, email, phoneNumber, userType } = req.body;

		try {
			if (uid) {
				const authClaim = { firstName, lastName, uid, userType };
				await Promise.all([
					admin.auth().setCustomUserClaims(uid, authClaim),
					UserRepo.create({
						...new UserModel(),
						id: uid,
						firstName,
						lastName,
						email,
						phoneNumber,
						userType,
						createdAt: admin.firestore.Timestamp.now(),
					}),
				]);

				return successNoData(res, OK, 'User created successfully');
			}
			return validationError(res, 'No valid uid');
		} catch (error) {
			return tryCatchError(res, error);
		}
	},
	/**
	 *
	 * @param req Request body
	 * @param res Response body
	 * Handles editing user details and updating auth claims;
	 */
	async editUser(req: Request, res: Response) {
		const userData = req.body;
		const { uid, firstName, lastName, userType } = userData;
		const promises = [] as Array<Promise<any>>;

		const authClaimUpdate: AuthClaimType = { uid };
		if (userType) {
			authClaimUpdate.userType = userType;
		}
		if (firstName) {
			authClaimUpdate.firstName = firstName;
		}
		if (lastName) {
			authClaimUpdate.lastName = lastName;
		}

		try {
			await runTransaction(async trans => {
				const userRepo = trans.getRepository(UserModel);
				const user = await userRepo.findById(uid);

				promises.push(
					admin.auth().setCustomUserClaims(uid, authClaimUpdate),
					userRepo.update({
						...user,
						...userData,
					})
				);

				return Promise.all(promises);
			});

			return successNoData(res, OK, 'User updated successfully');
		} catch (error) {
			return tryCatchError(res, error);
		}
	},
	/**
	 *
	 * @param req Request body
	 * @param res Response body
	 * Handles adding or removing existing property to a user favorites;
	 */
	async addOrRemovePropertyFromFavorites(req: Request, res: Response) {
		const favoritesData = req.body;

		const { favorites, type = FavoriteType.ADD } = favoritesData as FavoriteData;
		const { id: userId } = req.params;
		const favoriteProperty = plainToClass(FavoritePropertyValidation, favoritesData);

		try {
			const errors = await validate(favoriteProperty, { skipMissingProperties: true });
			if (errors.length > 0) {
				let errorTexts = [] as Array<{ [type: string]: string }>;

				for (const errorItem of errors) {
					if (errorItem.constraints) {
						errorTexts = errorTexts.concat(errorItem.constraints);
					}
				}

				return validationError(res, errorTexts);
			} else {
				await runTransaction(async trans => {
					const userRepo = trans.getRepository(UserModel);
					const user = await userRepo.findById(userId);

					return userRepo.update({
						...user,
						favoriteProperties:
							type === FavoriteType.ADD
								? admin.firestore.FieldValue.arrayUnion(favorites)
								: admin.firestore.FieldValue.arrayRemove(favorites),
					});
				});

				return successNoData(res, OK, 'Favorites added successfully');
			}
		} catch (error) {
			return tryCatchError(res, error);
		}
	},
};

export default UserController;
