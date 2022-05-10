import React from 'react';
import logo from '../../../img/faviconHeader.ico';
import logo2 from '../../../img/logo.gif';
import { Avatar, Badge, Input, Popover } from 'antd';
import { MailOutlined, NotificationOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types';
import './header.css';
//const
const { Search } = Input;
const content = (
	<div>
		<p>
			<a style={{ color: 'black' }}>Thông tin cá nhân </a>
		</p>
		<p>
			<a style={{ color: 'black' }}>Cài đặt</a>
		</p>
		<p>
			<a style={{ color: 'black' }}>Đăng xuất </a>
		</p>
	</div>
);
function HeaderAdmin() {
	const onSearch = (value) => console.log(value);
	return (
		<div className="header_admin">
			<div className="header_logo">
				<img src={logo} style={{ width: '15%', height: '50%', marginLeft: '5px' }} />
				<img src={logo2} style={{ width: '80%', height: '70%', marginLeft: '5px' }} />
			</div>
			<div className="header_filter">
				<div
					style={{
						width: '100%',
						margin: 'auto',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Search
						placeholder="input search text"
						onSearch={onSearch}
						enterButton
						style={{ width: '30%' }}
					/>
				</div>
			</div>
			<div className="header_logout">
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<div
						style={{
							width: '30%',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<div style={{ width: '50%' }}>
							<Badge count={1}>
								<NotificationOutlined style={{ fontSize: '20px' }} />
							</Badge>
						</div>
						<div style={{ width: '50%' }}>
							<Badge dot>
								<MailOutlined style={{ fontSize: '20px' }} />
							</Badge>
						</div>
					</div>
					<div
						style={{
							width: '70%',
							height: '100%',
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Avatar
							src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
							style={{
								width: '15%',
								height: '65%',
								margin: 'auto',
								objectFit: 'contain',
							}}
						/>
						<Popover content={content}>
							<a style={{ width: '85%', paddingLeft: '10px', color: 'black' }}>
								Đào Thị Thanh Mai
							</a>
						</Popover>
					</div>
				</div>
			</div>
		</div>
	);
}

HeaderAdmin.propTypes = {};

HeaderAdmin.defaultProps = {};

export default React.memo(HeaderAdmin);
