// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import baseAPI from '../axios/baseAPI';
import { TYPE_STORE, TypeApi } from '../util/TypeApi';
import { TYPE_ACTION } from '../actions/TypeAction';
import { message as messageAnt } from 'antd';
import useCartLogicData from './useCartLogicData';
// import PropTypes from 'prop-types';

function useTransactionData() {
	const dispatch = useDispatch();
	const transaction = useSelector((state) => state[TYPE_STORE.transaction]);
	const myUser = useSelector((state) => state[TYPE_STORE.myUser]);
	const { getListCart } = useCartLogicData();

	// handle func
	const postTransaction = async (dataPrams = {}, handleSuccess = () => {}) => {
		const { message, data } = await baseAPI.add(TypeApi.transaction, dataPrams);
		if (message === 'SUCCESS') {
			transaction[data._id] = data;
			dispatch({
				type: TYPE_ACTION.TRANSACTION.POST_TRANSACTION,
				payload: { data: { ...transaction } },
			});
			messageAnt.success('Đặt hàng thành công');
			handleSuccess();
		} else {
			messageAnt.warn(message);
		}
	};
	const putTransaction = async (dataPrams = {}, handleSuccess = () => {}) => {
		const { message, data } = await baseAPI.update(
			`${TypeApi.transaction}/${dataPrams._id && dataPrams._id}`,
			dataPrams
		);
		if (message === 'SUCCESS') {
			transaction[data._id] = data;
			dispatch({
				type: TYPE_ACTION.TRANSACTION.PUT_TRANSACTION,
				payload: { data: { ...transaction } },
			});
			messageAnt.success('Cập nhật thành công');
			handleSuccess();
		} else {
			messageAnt.warn(message);
		}
	};
	const getListTransaction = async (dataPrams = {}, isAdmin = false) => {
		!isAdmin && (dataPrams['user_id'] = myUser._id);
		const data = await baseAPI.getAll(TypeApi.transaction, dataPrams);
		dispatch({ type: TYPE_ACTION.TRANSACTION.GET_LIST, payload: { data } });
		getListCart();
	};
	return { transaction, postTransaction, getListTransaction, putTransaction };
}

useTransactionData.propTypes = {};

useTransactionData.defaultProps = {};

export default useTransactionData;
