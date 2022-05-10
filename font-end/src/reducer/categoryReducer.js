import { TYPE_ACTION } from '../actions/TypeAction';

const categoryReducer = (category = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.CATEGORY.GET_LIST:
			return {
				...category,
				...action.payload.data,
			};
		case TYPE_ACTION.CATEGORY.POST_CATEGORY:
			return { ...category, ...action.payload.data };
		case TYPE_ACTION.CATEGORY.DELETE_CATEGORY:
			return { ...action.payload.data };
		case TYPE_ACTION.CATEGORY.PUT_CATEGORY:
			return { ...action.payload.data };
		default:
			return category;
	}
};
export default categoryReducer;
