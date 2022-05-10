const setLocalStore = (accountAdmin, name = '') => {
	accountAdmin &&
		Object.keys(accountAdmin).map((item) => {
			localStorage.setItem(
				name.length > 0 ? `${item}_${name}` : item,
				accountAdmin[item]
			);
			return null;
		});
};
export default setLocalStore;
