const TypeApi = {
	user: '/user',
	product: '/product',
	cart: '/cart',
	admin: '/admin',
	catalog: '/catalog',
	slider: '/slider',
	transaction: '/transaction',
	adminuser: '/user/admin',
	chart: '/chart',
	comments: '/comment',
};

const TYPE_STORE = {
	user: 'user',
	myUser: 'myUser',
	product: 'product',
	carts: 'carts',
	category: 'category',
	slider: 'slider',
	transaction: 'transaction',
	userAdmin: 'admin',
	accountAdmin: 'accountAdmin',
	comment: 'comment',
};
const BASE_URL = 'http://localhost:1999/api';
const BASE_URL_IMAGE = `${BASE_URL}/file/`;
export { TypeApi, BASE_URL, BASE_URL_IMAGE, TYPE_STORE };
