/* eslint-disable */
import React from 'react';
import Comments from './Comments';
import useCommentsLogic from '../../hooks/useCommentsLogic';
import { useSelector } from 'react-redux';
import { BASE_URL_IMAGE, TYPE_STORE } from '../../util/TypeApi';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

// import PropTypes from 'prop-types';

function CommentsContainer({ id_product, maxIndex, minIndex }) {
	// hooks
	const user = localStorage.getItem('_id');
	const comments = useSelector((state) => state[TYPE_STORE.comment]);
	const [getList, postComment, deleteComments, putComment] = useCommentsLogic();
	const myUser = useSelector((state) => state[TYPE_STORE.myUser]);

	// state

	// handle
	const deleteComment = (id) => {
		deleteComments(id);
	};
	const handleLikeDislikeComment = (id) => {
		!user &&
			confirm({
				title: 'Bạn phải đăng nhập để thực hiện chức năng này?',
				icon: <ExclamationCircleOutlined />,
				onOk() {
					console.log('OK');
				},
				onCancel() {
					console.log('Cancel');
				},
			});
		user && putComment(id, { like_comment: user });
	};
	const post = (obj) => {
		postComment(obj);
	};

	React.useEffect(() => {
		getList({ id_product })
			.then()
			.catch((err) => console.log(err));
	}, [id_product]);
	return (
		<Comments
			data={comments}
			id_product={id_product}
			postComment={post}
			id_user={myUser._id}
			deleteComment={deleteComment}
			handleLikeDislikeComment={handleLikeDislikeComment}
			avatarUrl={BASE_URL_IMAGE + myUser.avatar}
			maxIndex={maxIndex}
			minIndex={minIndex}
		/>
	);
}

CommentsContainer.propTypes = {
	id_product: PropTypes.string.isRequired,
};

CommentsContainer.defaultProps = {};

export default React.memo(CommentsContainer);
