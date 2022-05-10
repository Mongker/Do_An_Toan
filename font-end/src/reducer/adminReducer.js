import { TYPE_ACTION } from '../actions/TypeAction';
const adminReducer = (admin = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.ADMIN.GET_ALL:
			return { ...admin, ...action.payload.data };
		case TYPE_ACTION.ADMIN.POST:
			return { ...admin, ...action.payload.data };
		case TYPE_ACTION.ADMIN.PUT:
			return { ...admin, ...action.payload.data };
		case TYPE_ACTION.ADMIN.DELETE:
			return action.payload.data;
		default:
			return admin;
	}
};
export default adminReducer;
