// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import baseAPI from '../axios/baseAPI';
import { TYPE_STORE, TypeApi } from '../util/TypeApi';
import { TYPE_ACTION } from '../actions/TypeAction';
import { message as messageAnt } from 'antd';
// import PropTypes from 'prop-types';

function useCustomerLogicData() {
	const dispatch = useDispatch();
	const customer = useSelector((state) => state[TYPE_STORE.user]);
	const getListCustomer = async (obj = {}) => {
		const data = await baseAPI.getAll(TypeApi.user, obj);
		dispatch({ type: TYPE_ACTION.CUSTOMER.GET_LIST, payload: { data } });
	};
	const getDateFlowId = async (id, callback = () => null) => {
		const data = await baseAPI.getAll(`${TypeApi.user}/${id}`);
		callback(data);
		return data;
	};
	const updateCustomer = async (obj) => {
		const { message, user } = await baseAPI.update(
			`${TypeApi.adminuser}/${obj._id}`,
			obj
		);
		if (message === 'SUCCESS') {
			customer[obj._id] = user;
			dispatch({
				type: TYPE_ACTION.CUSTOMER.PUT_CUSTOMER,
				payload: { data: { ...customer } },
			});
			messageAnt.success('Cập nhật thành công !');
		} else messageAnt.warn(message);
	};
	return { customer, getListCustomer, updateCustomer, getDateFlowId };
}

useCustomerLogicData.propTypes = {};

useCustomerLogicData.defaultProps = {};

export default useCustomerLogicData;
