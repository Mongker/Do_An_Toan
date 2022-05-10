import { TYPE_ACTION } from '../actions/TypeAction';
const setLocalStore = (myUser) => {
	myUser &&
		Object.keys(myUser).map((item) => {
			localStorage.setItem(item, myUser[item]);
			return null;
		});
};
const myUserReducer = (user = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.USER.LOGIN:
			setLocalStore(action.payload.data);
			return action.payload.data;
		case TYPE_ACTION.USER.LOGOUT:
			return {};
		case TYPE_ACTION.USER.EDIT_USER:
			setLocalStore(action.payload.data);
			return action.payload.data;
		default:
			return user;
	}
};
export default myUserReducer;
