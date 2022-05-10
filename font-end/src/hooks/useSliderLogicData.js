// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import baseAPI from '../axios/baseAPI';
import { TYPE_STORE, TypeApi } from '../util/TypeApi';
import { TYPE_ACTION } from '../actions/TypeAction';
import { message as messageAnt } from 'antd';
// import PropTypes from 'prop-types';

function useSliderLogicData() {
	const dispatch = useDispatch();
	const slider = useSelector((state) => state[TYPE_STORE.slider]);
	// handle func

	const getListSlider = async (obj = {}) => {
		const data = await baseAPI.getAll(TypeApi.slider, obj);
		dispatch({ type: TYPE_ACTION.SLIDER.GET_LIST, payload: { data } });
	};
	const postSlider = async (obj) => {
		const { message, id } = await baseAPI.add(TypeApi.slider, obj);
		if (message === 'SUCCESS') {
			obj['_id'] = id;
			slider[id] = obj;
			dispatch({
				type: TYPE_ACTION.SLIDER.POST_SLIDER,
				payload: { data: { ...slider } },
			});
			messageAnt.success('Thêm slider thành công !');
		} else {
			messageAnt.warn(message);
		}
	};
	const deleteSlider = async (id) => {
		const { message } = await baseAPI.delete(TypeApi.slider, id);
		if (message === 'SUCCESS') {
			delete slider[id];
			Object.values(slider)
				.sort((a, b) => a.index - b.index)
				.map((item, index) => {
					item.index = index + 1;
					dispatch({
						type: TYPE_ACTION.SLIDER.PUT_SLIDER,
						payload: { data: { ...item } },
					});
					return null;
				});
			dispatch({
				type: TYPE_ACTION.SLIDER.DELETE_SLIDER,
				payload: { data: { ...slider } },
			});
			messageAnt.success('Xóa thành công!');
		} else messageAnt.warn(message);
	};
	const updateSlider = async (obj) => {
		const { message } = await baseAPI.update(`${TypeApi.slider}/${obj._id}`, obj);
		if (message === 'SUCCESS') {
			slider[obj._id] = obj;
			dispatch({
				type: TYPE_ACTION.SLIDER.PUT_SLIDER,
				payload: { data: { ...slider } },
			});
			messageAnt.success('Sửa thông tin slider thành công !');
		} else messageAnt.warn(message);
	};
	return { slider, getListSlider, postSlider, deleteSlider, updateSlider };
}

useSliderLogicData.propTypes = {};

useSliderLogicData.defaultProps = {};

export default useSliderLogicData;
