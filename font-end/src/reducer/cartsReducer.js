import { TYPE_ACTION } from '../actions/TypeAction';

const cartsReducer = (carts = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.CART.GET_ALL_CART:
			return { ...carts, ...action.payload.data };
		case TYPE_ACTION.CART.ADD_CART:
			return action.payload.data;
		case TYPE_ACTION.CART.DELETE_CART:
			return action.payload.data;
		case TYPE_ACTION.CART.EDIT_CART:
			return action.payload.data;
		case TYPE_ACTION.CART.CLEAR_LOGOUT:
			return {};
		default:
			return carts;
	}
};
export default cartsReducer;
