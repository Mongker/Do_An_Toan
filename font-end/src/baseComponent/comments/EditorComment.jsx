import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Input, Rate } from 'antd';
import styles from './index.module.scss';

const { TextArea } = Input;

function EditorComment({ handleSend, isShowEditor = null, rootId }) {
	// state
	const [content, setContent] = React.useState('');
	const [vote, setVote] = React.useState(0);

	const onChange = React.useCallback((e) => setContent(e.target.value), []);
	const handleChangeVote = (value) => {
		setVote(value);
	};
	const onSend = () => {
		console.table({ content, vote }); // MaiDao
		handleSend(rootId, content, vote);
		setContent('');
		setVote(0);
	};
	return (
		<div className={styles.editor} style={{ paddingLeft: isShowEditor && '30px' }}>
			<TextArea
				value={content}
				placeholder={isShowEditor ? '' : 'Bình luận của bạn'}
				allowClear={false}
				onChange={onChange}
				rows={isShowEditor ? 2 : 3}
			/>
			<div className={styles.submit_comment}>
				{!isShowEditor && (
					<Rate
						style={{ fontSize: '16px' }}
						allowHalf
						value={vote}
						onChange={handleChangeVote}
					/>
				)}
				<Button type={'primary'} onClick={onSend} className={styles.button_comment}>
					Gửi
				</Button>
			</div>
		</div>
	);
}

EditorComment.propTypes = {
	handleText: PropTypes.func,
	handleSend: PropTypes.func,

	avatarUrl: PropTypes.string,
	rootId: PropTypes.string,
};

EditorComment.defaultProps = {
	handleText: () => null,
	handleSend: () => null,
	rootId: '-1',
};

export default React.memo(EditorComment);
