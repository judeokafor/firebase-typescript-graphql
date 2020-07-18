import { OK } from 'http-status-codes';
import { Request, Response } from 'express';
import { runTransaction } from 'fireorm';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import utils from '../../utils';
import { Property } from '../../fireorms';
import { PostPropertyValidation, EditPropertyValidation } from './validations';

const { Property: PropertyModel } = Property;
const { errorHandler, successHandler } = utils;
const { tryCatchError, validationError } = errorHandler;
const { successNoData } = successHandler;
const { admin } = utils.firebase;

const PropertyController = {
	/**
	 *
	 * @param req Request body
	 * @param res Response body
	 * Handles creating new property
	 * image upload is handled in the middleware before this controller
	 */
	async postProperty(req: Request, res: Response) {
		const propertyData = req.body;
		const property = plainToClass(PostPropertyValidation, propertyData);

		try {
			const errors = await validate(property, { skipMissingProperties: true });
			if (errors.length > 0) {
				let errorTexts = [] as Array<{ [type: string]: string }>;

				for (const errorItem of errors) {
					if (errorItem.constraints) {
						errorTexts = errorTexts.concat(errorItem.constraints);
					}
				}

				return validationError(res, errorTexts);
			} else {
				await runTransaction(trans => {
					const propertyRepo = trans.getRepository(PropertyModel);
					return propertyRepo.create({
						...new PropertyModel(),
						...propertyData,
						createdAt: admin.firestore.Timestamp.now(),
					});
				});

				return successNoData(res, OK, 'Property created successfully');
			}
		} catch (error) {
			return tryCatchError(res, error);
		}
	},
	/**
	 *
	 * @param req Request body
	 * @param res Response body
	 * Handles editing existing property;
	 * image upload is handled in the middleware before this controller
	 */
	async editProperty(req: Request, res: Response) {
		const propertyData = req.body;
		const { id: propertyId } = req.params;
		const property = plainToClass(EditPropertyValidation, propertyData);

		try {
			const errors = await validate(property, { skipMissingProperties: true });
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
					const propertyRepo = trans.getRepository(PropertyModel);
					const property = await propertyRepo.findById(propertyId);

					return propertyRepo.update({
						...property,
						...propertyData,
					});
				});

				return successNoData(res, OK, 'Property updated successfully');
			}
		} catch (error) {
			return tryCatchError(res, error);
		}
	},

	/**
	 *
	 * @param req Request body
	 * @param res Response body
	 * Handles deleting existing property, which turns the property value to archive true;
	 */
	async deleteExistingProperty(req: Request, res: Response) {
		const { id: propertyId } = req.params;

		try {
			await runTransaction(async trans => {
				const propertyRepo = trans.getRepository(PropertyModel);
				const property = await propertyRepo.findById(propertyId);
				return propertyRepo.update({
					...property,
					isArchived: true,
				});
			});

			return successNoData(res, OK, 'Property deleted successfully');
		} catch (error) {
			return tryCatchError(res, error);
		}
	},
};

export default PropertyController;