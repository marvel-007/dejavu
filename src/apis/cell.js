import appbase from 'appbase-js';
import { parseUrl } from '../utils';

const setCellValue = async (app, rawUrl, id, property, value) => {
	try {
		const { url, credentials } = parseUrl(rawUrl);
		const api = appbase({
			app,
			url,
			credentials,
		});
		const res = await api.update({
			type: app, // this should include the correct type when fixed in ReactiveSearch
			id,
			body: {
				doc: {
					[property]: value,
				},
			},
		});
		return res;
	} catch (error) {
		const errorMessage = error.statusText || 'Unable to update data'; // broken in appbase-js, need to fix it later
		throw new Error(errorMessage);
	}
};

export default setCellValue;