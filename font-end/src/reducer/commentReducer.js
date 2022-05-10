import { TYPE_ACTION } from '../actions/TypeAction';
const commentReducer = (comment = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.COMMENT.GET_LIST:
			return { ...action.payload.dataDispatch };
		case TYPE_ACTION.COMMENT.POST:
			return { ...comment, ...action.payload.data };
		case TYPE_ACTION.COMMENT.PUT:
			return action.payload.data;
		case TYPE_ACTION.COMMENT.DELETE:
			return action.payload.data;
		default:
			return comment;
	}
};
export default commentReducer;
