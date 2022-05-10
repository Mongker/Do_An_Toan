import React from 'react';
import baseAPI from '../axios/baseAPI';
import { TYPE_STORE, TypeApi } from '../util/TypeApi';
import { TYPE_ACTION } from '../actions/TypeAction';
import { message as messageAnt } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// import PropTypes from 'prop-types';

function useCommentsLogic() {
	const dispatch = useDispatch();
	const comments = useSelector((state) => state[TYPE_STORE.comment]);
	const getListComment = async (data) => {
		const dataDispatch = await baseAPI.getAll(TypeApi.comments, data);
		console.log('dataDispatch', dataDispatch); // MaiDao
		dispatch({ type: TYPE_ACTION.COMMENT.GET_LIST, payload: { dataDispatch } });
	};
	const postComment = async (obj) => {
		const { message, data } = await baseAPI.add(TypeApi.comments, obj);
		if (message === 'SUCCESS') {
			obj = data;
			comments[data._id] = obj;
			dispatch({
				type: TYPE_ACTION.COMMENT.POST,
				payload: { data: { ...comments } },
			});
		} else {
			messageAnt.warn(message);
		}
	};
	const deleteComments = async (id) => {
		const { message } = await baseAPI.delete(TypeApi.comments, id);
		if (message === 'SUCCESS') {
			delete comments[id];
			dispatch({
				type: TYPE_ACTION.COMMENT.DELETE,
				payload: { data: { ...comments } },
			});
			messageAnt.success('Xóa thành công');
		} else {
			messageAnt.warn(message);
		}
	};
	const putComment = async (id, obj) => {
		const { message, data } = await baseAPI.update(`${TypeApi.comments}/${id}`, obj);
		if (message === 'SUCCESS') {
			comments[id] = data;
			dispatch({
				type: TYPE_ACTION.COMMENT.PUT,
				payload: { data: { ...comments } },
			});
		} else messageAnt.warn(message);
	};
	return [getListComment, postComment, deleteComments, putComment];
}

export default useCommentsLogic;
