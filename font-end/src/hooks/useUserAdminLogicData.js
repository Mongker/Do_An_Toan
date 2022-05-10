// import React from 'react';
import baseAPI from '../axios/baseAPI';
import { TYPE_STORE, TypeApi } from '../util/TypeApi';
import { TYPE_ACTION } from '../actions/TypeAction';
import { useDispatch, useSelector } from 'react-redux';
import { message as messageAnt } from 'antd';
// import PropTypes from 'prop-types';

function useUserAdminLogicData() {
	const dispatch = useDispatch();
	const userAdmin = useSelector((state) => state[TYPE_STORE.userAdmin]);
	const accountAdmin = useSelector((state) => state[TYPE_STORE.accountAdmin]);
	const getListAdmin = async (obj = {}) => {
		const data = await baseAPI.getAll(TypeApi.admin, obj);
		dispatch({ type: TYPE_ACTION.ADMIN.GET_ALL, payload: { data } });
	};
	const postUserAdmin = async (obj) => {
		const { message, id } = await baseAPI.add(TypeApi.admin, obj);
		if (message === 'SUCCESS') {
			obj['_id'] = id;
			userAdmin[id] = obj;
			dispatch({
				type: TYPE_ACTION.ADMIN.POST,
				payload: { data: { ...userAdmin } },
			});
			messageAnt.success('Thêm tài khoản thành công !');
		} else {
			messageAnt.warn(message);
		}
	};
	const deleteUserAdmin = async (id) => {
		const { message } = await baseAPI.delete(TypeApi.admin, id);
		if (message === 'SUCCESS') {
			delete userAdmin[id];
			dispatch({
				type: TYPE_ACTION.ADMIN.DELETE,
				payload: { data: { ...userAdmin } },
			});
			messageAnt.success('Xóa thành công!');
		} else messageAnt.warn(message);
	};
	const updateUserAdmin = async (obj) => {
		const { message } = await baseAPI.update(`${TypeApi.admin}/${obj._id}`, obj);
		if (message === 'SUCCESS') {
			userAdmin[obj._id] = obj;
			dispatch({
				type: TYPE_ACTION.ADMIN.PUT,
				payload: { data: { ...userAdmin } },
			});
			if (obj._id === accountAdmin._id) {
				dispatch({
					type: TYPE_ACTION.ADMIN.PUT_ACCOUNT_ADMIN,
					payload: { data: obj}
				})
			}
			messageAnt.success('Sửa thông tin thành công !');
		} else messageAnt.warn(message);
	};
	return { userAdmin, getListAdmin, postUserAdmin, deleteUserAdmin, updateUserAdmin };
}

useUserAdminLogicData.propTypes = {};

useUserAdminLogicData.defaultProps = {};

export default useUserAdminLogicData;
