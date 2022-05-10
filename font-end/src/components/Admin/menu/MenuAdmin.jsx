/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import logo from '../../../img/logotet2019.png';
import { Menu } from 'antd';
import {
	ContactsOutlined,
	ContainerOutlined,
	DesktopOutlined,
	FormOutlined,
	HomeOutlined,
	LogoutOutlined,
	OrderedListOutlined,
	SettingOutlined,
	SlidersOutlined,
} from '@ant-design/icons';
import { TYPE_ACTION } from '../../../actions/TypeAction';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
function MenuAdmin(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const accountAdmin = useSelector((state) => state['accountAdmin']);
	const { setCheckKey, objectKey } = props;

	// const
	const keyMenu = React.useMemo(
		() =>
			localStorage.getItem('checkKey_admin')
				? localStorage.getItem('checkKey_admin')
				: objectKey.TRANG_CHU,
		[]
	);

	// func
	const handleClick = ({ key }) => {
		setCheckKey(key);
		if (key === 'Đăng xuất') {
			localStorage.clear();
			dispatch({ type: TYPE_ACTION.ADMIN.LOGOUT });
			history.push('/admin');
		}
	};
	return (
		<Menu
			theme={'dark'}
			mode={'inline'}
			defaultSelectedKeys={keyMenu}
			onClick={handleClick}
		>
			<div
				className="logo"
				style={{ width: '100%', height: 63, cursor: 'pointer' }}
				onClick={() => history.push('/')}
			>
				<img alt={'logo admin'} src={logo} style={{ width: '100%', height: '100%' }} />
			</div>
			<Menu.Item key={objectKey.TRANG_CHU} icon={<HomeOutlined />}>
				Trang chủ
			</Menu.Item>
			<Menu.Item key={objectKey.DANH_MUC} icon={<OrderedListOutlined />}>
				Danh mục
			</Menu.Item>
			<Menu.Item key={objectKey.SAN_PHAM} icon={<DesktopOutlined />}>
				Sản phẩm
			</Menu.Item>
			<Menu.Item key={objectKey.DON_HANG} icon={<ContainerOutlined />}>
				Đơn hàng
			</Menu.Item>
			<Menu.Item key={objectKey.SLIDER} icon={<SlidersOutlined />}>
				Slider
			</Menu.Item>
			<Menu.Item key={objectKey.KHACH_HANG} icon={<ContactsOutlined />}>
				Khách hàng
			</Menu.Item>
			{/* Chỉ có position mới có quyền xem mục này */}
			{accountAdmin && accountAdmin.position === 'Quản lý' && (
				<Menu.Item key={objectKey.NHAN_VIEN} icon={<FormOutlined />}>
					Nhân viên
				</Menu.Item>
			)}
			<Menu.Item key={objectKey.CAI_DAT} icon={<SettingOutlined />}>
				Cài đặt tài khoản
			</Menu.Item>
			<Menu.Item icon={<LogoutOutlined />} key={objectKey.LOGOUT}>
				Đăng xuất
			</Menu.Item>
		</Menu>
	);
}
MenuAdmin.propTypes = {
	objKeyMenu: PropTypes.object.isRequired,
	setCheckKey: PropTypes.func,
};
MenuAdmin.defaultProps = {
	objKeyMenu: {
		TRANG_CHU: 'Trang chủ',
		DANH_MUC: 'Danh mục',
		SAN_PHAM: 'Sản phẩm',
		DON_HANG: 'Đơn hàng',
		SLIDER: 'Slider',
		KHACH_HANG: 'Khách hàng',
		NHAN_VIEN: 'Nhân viên',
		CAI_DAT: 'Cài đặt tài khoản',
		LOGOUT: 'Đăng xuất',
	},
	setCheckKey: () => null,
};
export default React.memo(MenuAdmin);
