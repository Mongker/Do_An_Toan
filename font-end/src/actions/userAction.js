import createActionNoAppID from './baseAction';
import { TYPE_ACTION } from './TypeAction';

const AddUser = (data) => createActionNoAppID(TYPE_ACTION.USER.ADD_USER, { data });
const LoginUser = (data) => createActionNoAppID(TYPE_ACTION.USER.LOGIN, { data });
const UpdateUser = (data) => createActionNoAppID(TYPE_ACTION.USER.EDIT_USER, { data });
export { AddUser, LoginUser, UpdateUser };
