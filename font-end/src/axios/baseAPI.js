import axiosClient from '../components/Header/menuHeader/axiosClient';
import queryString from 'query-string';

const baseAPI = {
	getAll(url, data) {
		const paramsString = queryString.stringify(data);
		return axiosClient.get(`${url}?${paramsString}`);
	},

	add(url, data) {
		return axiosClient.post(url, data);
	},
	update(url, data) {
		return axiosClient.put(url, data);
	},
	delete(_url, id) {
		const url = `${_url}/${id}`;
		return axiosClient.delete(url);
	},
};
export default baseAPI;
