import { TYPE_ACTION } from '../actions/TypeAction';
const transactionReducer = (transaction = {}, action) => {
	switch (action.type) {
		case TYPE_ACTION.TRANSACTION.GET_LIST:
			return { ...transaction, ...action.payload.data };
		case TYPE_ACTION.TRANSACTION.POST_TRANSACTION:
			return action.payload.data;
		case TYPE_ACTION.TRANSACTION.PUT_TRANSACTION:
			return action.payload.data;
		case TYPE_ACTION.TRANSACTION.DELETE_TRANSACTION:
			return action.payload.data;
		default:
			return transaction;
	}
};
export default transactionReducer;
