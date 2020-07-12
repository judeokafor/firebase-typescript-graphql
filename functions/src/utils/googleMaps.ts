import { Client, Status } from '@googlemaps/google-maps-services-js';

const client = new Client({});

export default {
	getLocationData: async address => {
		try {
			const response = await client.geocode({
				params: {
					address,
					key: process.env._GOOGLE_MAPS_API_KEY || '',
				},
				timeout: 1000,
			});

			if (response.data.status === Status.OK) {
				const { formatted_address, geometry } = response.data.results[0];
				const {
					location: { lat, lng },
				} = geometry;
				return { formatted_address, lat, lng };
			}
		} catch (error) {
			console.log(error);
		}
		return null;
	},
};
