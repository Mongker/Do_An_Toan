import { createContext } from 'react';
const defaultFunc = () => null;
const ContextApp = createContext({
	selectedRowKeys: [],
	setSelectedRowKeys: defaultFunc,

	textSearch: '',
	setTextSearch: defaultFunc(),
});
export { ContextApp };
