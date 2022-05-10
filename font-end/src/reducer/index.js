import { TYPE_STORE } from '../util/TypeApi';

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import myUserReducer from './myUserReducer';
import productReducer from './producerReducer';
import cartsReducer from './cartsReducer';
import categoryReducer from './categoryReducer';
import sliderReducer from './sliderReducer';
import transactionReducer from './transactionReducer';
import customerReducer from './customerReducer';
import adminReducer from './adminReducer';
import accountAdimReducer from './accountAdimReducer';
import commentReducer from './commentReducer';

const store = {};
const listState = [
	{
		name: TYPE_STORE.user,
		value: userReducer,
	},
	{
		name: TYPE_STORE.myUser,
		value: myUserReducer,
	},
	{
		name: TYPE_STORE.product,
		value: productReducer,
	},
	{
		name: TYPE_STORE.carts,
		value: cartsReducer,
	},
	{
		name: TYPE_STORE.category,
		value: categoryReducer,
	},
	{
		name: TYPE_STORE.slider,
		value: sliderReducer,
	},
	{
		name: TYPE_STORE.comment,
		value: commentReducer,
	},
	{
		name: TYPE_STORE.transaction,
		value: transactionReducer,
	},
	{
		name: TYPE_STORE.user,
		value: customerReducer,
	},
	{
		name: TYPE_STORE.userAdmin,
		value: adminReducer,
	},
	{
		name: TYPE_STORE.accountAdmin,
		value: accountAdimReducer,
	},
];
listState.map((item) => (store[item.name] = item.value));
const rootReducer = combineReducers(store);
export default rootReducer;
