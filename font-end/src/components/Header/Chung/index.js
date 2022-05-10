import React from 'react';
import Advertisement from '../advertisement/advertisement';
import MenuHome from '../menuHeader/MenuHome';
// import PropTypes from 'prop-types';
import './styles.css';
import { Link } from 'react-router-dom';
import {
	GiftOutlined,
	PhoneOutlined,
	QuestionCircleOutlined,
	SmileTwoTone,
	StarOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

const Style = {
	width: '1200px',
	height: '60px',
	display: 'flex',
	float: 'left',
};
function Chung() {
	return (
		<div className="header_home">
			<div className="top_header">
				<div style={Style}>
					<Advertisement />
				</div>
			</div>
			<div className="top_nav">
				<div className="wrap">
					<div className="nav_content">
						<div style={{ display: 'flex' }}>
							<div>
								Tổng đài <span style={{ color: 'red' }}>1800 6066</span> (miễn phí) - CSKH
								<span style={{ color: 'red' }}> 1900 6483</span>
							</div>
							<div>
								<Tooltip placement="bottom" title="Quà tặng" color="#f50">
									<GiftOutlined
										style={{ color: '#e218df', fontSize: '16px', margin: '0 10px' }}
									/>
								</Tooltip>
							</div>
						</div>
						{/*<div style={{ display: 'flex' }}>*/}
						{/*	<Link to={'/gioithieu'}>*/}
						{/*		<div className="nav_item_right">*/}
						{/*			<SmileTwoTone style={{ fontSize: '14px', marginRight: 5 }} /> Giới thiệu*/}
						{/*		</div>*/}
						{/*	</Link>*/}
						{/*	<Link to={'/guider'}>*/}
						{/*		<div className="nav_item_right">*/}
						{/*			<QuestionCircleOutlined*/}
						{/*				style={{ color: '#25e0ab', fontSize: '14px', marginRight: 5 }}*/}
						{/*			/>*/}
						{/*			Hướng dẫn mua hàng*/}
						{/*		</div>*/}
						{/*	</Link>*/}
						{/*	<Link to={'/flashsale'}>*/}
						{/*		<div className="nav_item_right">*/}
						{/*			<StarOutlined*/}
						{/*				style={{ color: '#e31a42', fontSize: '14px', marginRight: 5 }}*/}
						{/*			/>*/}
						{/*			Khuyến mại*/}
						{/*		</div>*/}
						{/*	</Link>*/}
						{/*	<Link to={'/lienhe'}>*/}
						{/*		<div className="nav_item_right_LH">*/}
						{/*			<PhoneOutlined*/}
						{/*				style={{ color: '#2bbe26', fontSize: '14px', marginRight: 5 }}*/}
						{/*			/>*/}
						{/*			Liên hệ*/}
						{/*		</div>*/}
						{/*	</Link>*/}
						{/*</div>*/}
					</div>
				</div>
			</div>
			<div className="from_menu_header">
				<div style={{ display: 'flex', height: '100px', width: '1200px' }}>
					<MenuHome />
				</div>
			</div>
		</div>
	);
}

Chung.propTypes = {};

Chung.defaultProps = {};

export default React.memo(Chung);
