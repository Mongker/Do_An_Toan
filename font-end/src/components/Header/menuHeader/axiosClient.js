import axios from 'axios';
import { BASE_URL } from '../../../util/TypeApi';
const axiosClient = axios.create({
	baseURL: BASE_URL,
	headers: { 'X-Custom-Header': '', 'Content-Type': 'application/json' },
});
//interceptors
// Add a request interceptors
axiosClient.interceptors.request.use(
	function (config) {
		// Do something before request is send
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);
// Add a response interceptors
axiosClient.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response.data;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);
export default axiosClient;
