/* eslint-disable */
import React, { createElement, useState } from 'react';
// import PropTypes from 'prop-types';
import { Comment, Avatar, Form, Button, List, Input, Tooltip } from 'antd';
import moment from 'moment';
import {
	DislikeOutlined,
	LikeOutlined,
	DislikeFilled,
	LikeFilled,
} from '@ant-design/icons';
import './styles.css';
//const
const { TextArea } = Input;
// dòng dưới comment
const CommentList = (props) => {
	const { comments } = props;
	return (
		<List
			dataSource={comments}
			header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
			itemLayout="horizontal"
			renderItem={(props) => <Comment {...props} />}
		/>
	);
};
// Form add comment
const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
				Add Comment
			</Button>
		</Form.Item>
	</>
);
function CommentProduct() {
	const [comments, setComments] = React.useState([]);
	console.log('comments', comments);
	const [submitting, setSubmitting] = React.useState(false);
	const [value, setValue] = React.useState('');
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [action, setAction] = useState(null);
	console.log('likes', likes);
	const like = () => {
		setLikes(likes + 1);
		setDislikes(dislikes > 0 ? dislikes - 1 : dislikes);
		setAction('liked');
	};
	console.log('dislikes', dislikes);
	const dislike = () => {
		setLikes(likes > 0 ? likes - 1 : likes);
		setDislikes(dislikes + 1);
		setAction('disliked');
	};
	// danh sách comment
	const actions = [
		<Tooltip key="comment-basic-like" title="Like">
			<span onClick={like}>
				{createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
				<span className="comment-action">{likes}</span>
			</span>
		</Tooltip>,
		<Tooltip key="comment-basic-dislike" title="Dislike">
			<span onClick={dislike}>
				{React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
				<span className="comment-action">{dislikes}</span>
			</span>
		</Tooltip>,
		<span key="comment-basic-reply-to" onClick={Editor}>
			Reply to
		</span>,
	];
	const handleSubmit = () => {
		if (!value) {
			return;
		}
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
			setValue('');
			setComments([
				...comments,
				{
					actions: actions, // Nay ko dc update nen no ko ve ra moi the moi bao chinh
					author: (
						<a style={{ fontSize: '16px' }}>
							<b>Mai Dao</b>
						</a>
					),
					avatar: (
						<Avatar
							src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
							alt="Mai Dao"
						/>
					),
					content: <p>{value}</p>,
					datetime: (
						<Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
							<span>{moment().fromNow()}</span>
						</Tooltip>
					),
				},
			]);
		}, 1000);
	};
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	React.useEffect(() => {
		let arrNew = [];
		if (comments.length > 0) {
			comments.map((item) => arrNew.push({ ...item, actions: actions }));
			setComments([...arrNew]);
		}
	}, [likes]);

	return (
		<>
			{comments.length > 0 && <CommentList comments={comments} actions={actions} />}
			<Comment
				avatar={
					<Avatar
						src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						alt="Han Solo"
					/>
				}
				content={
					<Editor
						onChange={handleChange}
						onSubmit={handleSubmit}
						submitting={submitting}
						value={value}
					/>
				}
			/>
		</>
	);
}

CommentProduct.propTypes = {};

CommentProduct.defaultProps = {};

export default React.memo(CommentProduct);
