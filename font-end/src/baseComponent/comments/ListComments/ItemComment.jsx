import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import style from '../index.module.scss';
import UserComment from './UserComment';
import EditorComment from '../EditorComment';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { BASE_URL_IMAGE, TYPE_STORE } from '../../../util/TypeApi';
import useCustomerLogicData from '../../../hooks/useCustomerLogicData';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

function ItemComment({
	user,
	id_user,
	vote,
	content = '',
	like_comment,
	date,
	deleteComment = () => null,
	handleLikeDislikeComment = () => null,
	id,
	handleSend,
}) {
	const { customer, getListCustomer } = useCustomerLogicData();
	const listComments = useSelector((state) => state[TYPE_STORE.comment]);

	const comments = Object.values(listComments);
	const dataDetailComment = comments.filter((value, index) => id === value.id_comment);
	console.log('dataDetailComment', dataDetailComment); // MaiDao
	const [isShowEditor, setIsShowEditor] = React.useState(false);
	const [isShowDetailComment, setIsShowDetailComment] = React.useState(false);
	const [isUserDetail, setIsUserDetail] = useState({});

	const _handleSend = (id_comment, content, vote) => {
		handleSend(id_comment, content, vote);
		setIsShowEditor(false);
	};
	const handleClickShowAllCommentChild = () => {
		setIsShowDetailComment(!isShowDetailComment);
	};
	const handleFilterUser = (id) => {
		const filterImage = comments.filter((value) => value.id_user === id);
		return filterImage[0].image;
	};
	const handleClickReply = () => {
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
		id_user && setIsShowEditor(!isShowEditor);
	};

	React.useEffect(() => {
		getListCustomer();
	}, []);

	return (
		<div className={style.item_comment_row}>
			<div>
				<UserComment id={id_user} vote={vote} />
				<div className={style.item_comment_column_2}>{content}</div>
				<div className={style.comment_item_meta}>
					<a
						onClick={() => handleClickReply()}
						className={style.comment_item_reply}
						data-id="43971"
					>
						Trả lời
					</a>
					<a
						className={style.comment_item_reply}
						onClick={() => handleLikeDislikeComment(id)}
						id="like43971"
					>
						Thích ({like_comment.length})
					</a>
					{user === id_user && (
						<a className={style.comment_item_reply} onClick={() => deleteComment(id)}>
							Xóa
						</a>
					)}
					<span className={style.comment_item_time}>
						{moment(date).format('D/MM/YYYY h:mm:ss')}
					</span>
				</div>
			</div>
			{isShowDetailComment &&
				dataDetailComment &&
				dataDetailComment.length > 0 &&
				dataDetailComment.map((value) => {
					if (customer[value.id_user])
						return (
							<div className={style.comment_item_reply_wrap}>
								<div className={style.comment_item}>
									<div className={style.comment_item_author}>
										<div className={style.comment_item_author_avatext}>
											<img
												style={{ width: '26px', height: '26px' }}
												src={BASE_URL_IMAGE + customer[value.id_user].image}
												alt="Ngọc Bích"
											/>
											<Avatar
												icon={<UserOutlined />}
												style={{ width: '26px', height: '26px' }}
												src={BASE_URL_IMAGE + customer[value.id_user].image}
												alt="Ngọc Bích"
											/>
										</div>
										<span className={style.comment_item_author_name}>
											{customer[value.id_user].name}
										</span>
										{/*<span className={style.comment_item_author_admin}>Quản trị viên</span>*/}
									</div>
									<div className={style.comment_item_content}>{value.destination}</div>
									<div className={style.comment_item_meta}>
										<span className={style.comment_item_time}>
											{moment(value.date).format('D/MM/YYYY hh:mm:ss')}
										</span>
									</div>
								</div>
							</div>
						);
					return null;
				})}

			<div style={{ marginTop: '5px' }}>
				{isShowEditor && (
					<EditorComment
						rootId={id}
						handleSend={_handleSend}
						isShowEditor={isShowEditor}
					/>
				)}
			</div>
			{!isShowDetailComment && dataDetailComment && dataDetailComment.length > 0 && (
				<div onClick={handleClickShowAllCommentChild}>
					<span style={{ color: '#9f9999' }}>
						<i className={style.icon_reply_comment} />
					</span>
					<span className={style.detail_comment}>Xem thêm phản hồi</span>
				</div>
			)}
		</div>
	);
}

ItemComment.propTypes = {};

export default ItemComment;
