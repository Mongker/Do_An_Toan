import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import EditorComment from './EditorComment';
import ListComment from './ListComments/ListComment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;

function Comments({
	id_product,
	postComment,
	id_user,
	avatarUrl,
	data,
	deleteComment,
	handleLikeDislikeComment,
	maxIndex,
	minIndex,
}) {
	const [onClickReply, setOnClickReply] = useState(false);
	const handleReply = () => {
		setOnClickReply(true);
	};
	const handleSend = (id_comment = '-1', content, vote) => {
		!id_user &&
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
		id_user &&
			postComment({
				id_product,
				id_comment: id_comment,
				destination: content,
				vote: vote,
				date: new Date().getTime(),
				id_user,
			});
	};
	return (
		<div className={styles.container}>
			<ListComment
				data={data}
				deleteComment={deleteComment}
				handleLikeDislikeComment={handleLikeDislikeComment}
				handleReply={handleReply}
				maxIndex={maxIndex}
				minIndex={minIndex}
				onClickReply={onClickReply}
				avatarUrl={avatarUrl}
				handleSend={handleSend}
			/>
			<EditorComment avatarUrl={avatarUrl} handleSend={handleSend} />
		</div>
	);
}

Comments.propTypes = {
	id_product: PropTypes.string.isRequired,
	postComment: PropTypes.func,
	deleteComment: PropTypes.func,
	avatarUrl: PropTypes.string,
	id_user: PropTypes.string,
};

Comments.defaultProps = {
	postComment: () => null,
	deleteComment: () => null,
};

export default React.memo(Comments);
