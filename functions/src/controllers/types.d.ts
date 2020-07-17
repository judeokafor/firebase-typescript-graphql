import { User } from 'fireorms';
const { UserType } = User;

export type AuthClaimType = {
	userType?: typeof UserType;
	firstName?: string;
	lastName?: string;
	uid?: string;
};
