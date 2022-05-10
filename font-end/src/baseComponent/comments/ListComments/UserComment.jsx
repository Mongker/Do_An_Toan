import React from 'react';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';
import style from '../index.module.scss';
import { Rate } from 'antd';
import useCustomerLogicData from '../../../hooks/useCustomerLogicData';
// import PropTypes from 'prop-types';

function UserComment({ id, vote }) {
	const { getDateFlowId } = useCustomerLogicData();
	const [user, setUser] = React.useState(null);
	React.useEffect(() => {
		getDateFlowId(id)
			.then((data) => setUser(data))
			.catch((e) => console.log(e));
	}, []);
	if (!user) return null;
	return (
		<div className={style.comment_item_author}>
			<div className={style.comment_item_author_avatext}>
				<img
					style={{ width: '26px', height: '26px' }}
					src={BASE_URL_IMAGE + user.image}
					alt="Ngọc Bích- Phòng CSKH Sh op Trẻ Thơ"
				/>
			</div>
			<span className={style.comment_item_author_name}>{user.name}</span>
			<div className={style.show_rate}>
				<Rate allowHalf value={vote} />
			</div>
		</div>
	);
}

UserComment.propTypes = {};

UserComment.defaultProps = {};

export default UserComment;
