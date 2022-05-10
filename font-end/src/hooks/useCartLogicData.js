// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import baseAPI from '../axios/baseAPI';
import { TypeApi } from '../util/TypeApi';
import { TYPE_ACTION } from '../actions/TypeAction';
import { message } from 'antd';
// import PropTypes from 'prop-types';

function useCartLogicData() {
	// hooks
	const dispatch = useDispatch();
	const myUser = useSelector((state) => state['myUser']);
	const carts = useSelector((state) => state['carts']);

	// handle func
	const deleteCart = async (id) => {
		const { message: messageAPI } = await baseAPI.delete(TypeApi.cart, id);
		if (messageAPI === 'SUCCESS') {
			delete carts[id];
			dispatch({ type: TYPE_ACTION.CART.DELETE_CART, payload: { data: { ...carts } } });
		} else message.warn('Kiểm tra internet');
	};
	const getListCart = async (dataPrams = { user_id: myUser._id }) => {
		if (Object.keys(myUser).length > 0) {
			const data = await baseAPI.getAll(TypeApi.cart, dataPrams);
			dispatch({ type: TYPE_ACTION.CART.GET_ALL_CART, payload: { data } });
		}
	};
	const updateCart = async (obj = {}) => {
		const { message: messageAPI, data } = await baseAPI.update(
			`${TypeApi.cart}/${obj._id}`,
			obj
		);
		if (messageAPI === 'SUCCESS') {
			carts[obj._id] = data;
			dispatch({ type: TYPE_ACTION.CART.GET_ALL_CART, payload: { ...carts } });
		} else message.warn('Lỗi không cập nhật được');
	};
	return { carts, deleteCart, getListCart, updateCart };
}

export default useCartLogicData;
