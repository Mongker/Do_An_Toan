import { TYPE_ACTION } from '../actions/TypeAction';

const userReducer = (user = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.USER.GET_ALL_USER:
			return user;
		case TYPE_ACTION.USER.ADD_USER:
			return action.payload.data;
		case TYPE_ACTION.USER.DELETE_USER:
			return user;
		case TYPE_ACTION.USER.EDIT_USER:
			return user;
		default:
			return user;
	}
};
export default userReducer;
