import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

import getEnvironmentVariables from './getEnvironmentVariables';

dotenv.config();

const { isProduction } = getEnvironmentVariables.getEnvVariables();
const generateEmails = to => {
	const envBasedto = isProduction ? to : process.env._DEV_TEST_EMAIL;
	const envBasedCc = isProduction
		? // TODO: pull these emails fron firebase admin auth
		  [process.env._PAY_HIPPO_TEAM_EMAILS]
		: [process.env._DEV_TEST_EMAIL];
	return { envBasedCc, envBasedto };
};

const transporter = nodemailer.createTransport({
	auth: {
		pass: process.env._GMAIL_ADMIN_PASSWORD,
		user: process.env._GMAIL_ADMIN_EMAIL,
	},
	service: 'Gmail',
});

const Notification = {
	async send(to, subject, html, includeCC = true) {
		const { envBasedCc, envBasedto } = generateEmails(to);

		try {
			const info = await transporter.sendMail({
				cc: includeCC ? envBasedCc : [],
				from: `PayHippo ${process.env._GMAIL_ADMIN_EMAIL}`,
				html,
				subject,
				to: envBasedto,
			});

			// TODO: Add analystics on Success

			return info.messageId;
		} catch (error) {
			// TODO: Add analystics on failure

			console.log(error);
		}

		return null;
	},
};

export default Notification;
