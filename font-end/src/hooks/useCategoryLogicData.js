// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TYPE_STORE, TypeApi } from '../util/TypeApi';
import baseAPI from '../axios/baseAPI';
import { TYPE_ACTION } from '../actions/TypeAction';
import { message as messageAnt } from 'antd';
// import PropTypes from 'prop-types';

function useCategoryLogicData() {
	// hooks
	const category = useSelector((state) => state[TYPE_STORE.category]);
	const dispatch = useDispatch();

	// func
	const categoryArraySort = (paramId = '-1') =>
		Object.values(category)
			.filter((item) => item.paramId === paramId)
			.sort((a, b) => a.index - b.index);

	const getListCategory = async (dataPrams = {}) => {
		const data = await baseAPI.getAll(TypeApi.catalog, dataPrams);
		dispatch({ type: TYPE_ACTION.CATEGORY.GET_LIST, payload: { data } });
	};

	const postCategory = async (dataPrams = {}) => {
		const { message, data } = await baseAPI.add(TypeApi.catalog, dataPrams);
		if (message === 'Thêm danh mục thành công!') {
			const obj = {};
			obj[data._id] = data;
			dispatch({
				type: TYPE_ACTION.CATEGORY.POST_CATEGORY,
				payload: { data: obj },
			});
			messageAnt.success(message);
		} else {
			messageAnt.warn(message);
		}
	};

	const deleteCategory = async (id) => {
		const { message } = await baseAPI.delete(TypeApi.catalog, id);
		if (message === 'SUCCESS') {
			// Sắp xếp lại index
			const paramId = category[id].paramId;
			delete category[id];
			categoryArraySort(paramId).map((item, index) => {
				item.index = index + 1;
				dispatch({
					type: TYPE_ACTION.CATEGORY.PUT_CATEGORY,
					payload: { data: { ...item } },
				});
				return null; // Note: hot_bug
			});

			dispatch({
				type: TYPE_ACTION.CATEGORY.DELETE_CATEGORY,
				payload: { data: { ...category } },
			});
			messageAnt.success('Xóa thành công');
		}
	};
	const updateCategory = async (obj, isMessage = true) => {
		const { message } = await baseAPI.update(`${TypeApi.catalog}/${obj._id}`, obj);
		if (message === 'Sửa thông tin sản phẩm thành công !') {
			category[obj._id] = obj;
			dispatch({
				type: TYPE_ACTION.CATEGORY.PUT_CATEGORY,
				payload: { data: { ...category } },
			});
			isMessage && messageAnt.success('Cập nhật thành công');
		}
	};
	return { category, getListCategory, postCategory, deleteCategory, updateCategory };
}

useCategoryLogicData.propTypes = {};

useCategoryLogicData.defaultProps = {};

export default useCategoryLogicData;
