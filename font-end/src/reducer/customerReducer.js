import { TYPE_ACTION } from '../actions/TypeAction';
const customerReducer = (customer = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.CUSTOMER.GET_LIST:
			return { ...customer, ...action.payload.data };
		case TYPE_ACTION.CUSTOMER.PUT_CUSTOMER:
			return { ...customer, ...action.payload.data };
		case TYPE_ACTION.CUSTOMER.DELETE_CUSTOMER:
			return action.payload.data;
		default:
			return customer;
	}
};
export default customerReducer;
