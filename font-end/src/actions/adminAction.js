import createActionNoAppID from './baseAction';
import { TYPE_ACTION } from './TypeAction';

const loginAdmin = (data) => createActionNoAppID(TYPE_ACTION.ADMIN.LOGIN, { data });
export { loginAdmin };
