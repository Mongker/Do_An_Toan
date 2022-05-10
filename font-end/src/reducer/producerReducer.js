import { TYPE_ACTION } from '../actions/TypeAction';
const productReducer = (product = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.PRODUCT.GET_ALL_PRODUCT:
			return { ...product, ...action.payload.data };
		case TYPE_ACTION.PRODUCT.ADD_PRODUCT:
			return action.payload.data;
		case TYPE_ACTION.PRODUCT.EDIT_PRODUCT:
			return action.payload.data;
		case TYPE_ACTION.PRODUCT.DELETE_PRODUCT:
			return action.payload.data;
		default:
			return product;
	}
};
export default productReducer;
