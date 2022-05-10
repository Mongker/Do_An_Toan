/* eslint-disable */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../img/logotet2019.png';
import styles from './index.module.css';
import { Checkbox, message as messageAnt } from 'antd';
import cookie from 'react-cookies';
import baseAPI from '../../../axios/baseAPI';
import { TypeApi } from '../../../util/TypeApi';
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../../../actions/adminAction';
import TypeCookiesUtil from '../../../util/TypeCookies';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
// import PropTypes from 'prop-types';

const TypeInput = {
	user: 'user',
	password: 'password',
};

function LoginAdmin() {
	// hook
	const dispatch = useDispatch();
	const history = useHistory();
	const [userAdmin, setUserAdmin] = useState('');
	const [password, setPassword] = useState('');
	const [checkBox, setCheckBox] = useState(false);
	const [passView, setPassView] = useState(true);
	// const
	const isSavePassword = !!(
		cookie.load(TypeCookiesUtil.user_admin_save) &&
		cookie.load(TypeCookiesUtil.password_admin_save) &&
		cookie.load(TypeCookiesUtil.admin_checkbox_save)
	);
	const ShowPassword = () => {
		if (passView) {
			setPassView(false);
		} else {
			setPassView(true);
		}
	};
	// handle
	const onChangeText = (event, type) => {
		switch (type) {
			case TypeInput.user:
				setUserAdmin(event.target.value);
				break;
			case TypeInput.password:
				setPassword(event.target.value);
				break;
			default:
				break;
		}
	};

	const handleSaveUserPass = (e) => {
		if (e.target.checked) {
			cookie.save(TypeCookiesUtil.user_admin_save, userAdmin, { path: '/' });
			cookie.save(TypeCookiesUtil.password_admin_save, password, { path: '/' });
			cookie.save(TypeCookiesUtil.admin_checkbox_save, e.target.checked, { path: '/' });
		} else {
			cookie.remove(TypeCookiesUtil.user_admin_save, { path: '/' });
			cookie.remove(TypeCookiesUtil.password_admin_save, { path: '/' });
			cookie.save(TypeCookiesUtil.admin_checkbox_save, e.target.checked, { path: '/' });
		}
		setCheckBox(e.target.checked);
	};

	const onSave = async () => {
		const data = { userAdmin, password };
		if (userAdmin && password) {
			const { message, Admin } = await baseAPI.add(`${TypeApi.admin}/login`, data);
			if (message === 'SUCCESS') {
				await dispatch(loginAdmin(Admin));
				history.push('/homeAdmin');
			} else {
				messageAnt.warn(message);
			}
		} else {
			messageAnt.warn('Không được bỏ trống thông tin nào !');
		}
		setCheckBox(false);
	};

	const handleIsLogin = async (userAdmin = '', password = '') => {
		const { message, Admin } = await baseAPI.add(`${TypeApi.admin}/login`, {
			userAdmin,
			password,
		});
		if (message === 'SUCCESS') {
			await dispatch(loginAdmin(Admin));
			await history.push('/homeAdmin');
		}
	};

	// Vòng đời
	React.useEffect(() => {
		const user = localStorage.getItem('email_admin');
		const password = localStorage.getItem('password_admin');
		try {
			// Mục đích muốn kiểm tra xem người dùng đã đăng nhập từ lúc nào
			handleIsLogin(user, password).catch();
		} catch (e) {
			console.log('handleIsLogin error: ', e);
		}
		// Kiểm tra xem người dùng có lưu mật khẩu không
		if (isSavePassword) {
			setUserAdmin(cookie.load(TypeCookiesUtil.user_admin_save));
			setPassword(cookie.load(TypeCookiesUtil.password_admin_save));
			setCheckBox(Boolean(cookie.load(TypeCookiesUtil.admin_checkbox_save)));
		}
	}, []);

	React.useEffect(() => {
		if (isSavePassword) {
			setCheckBox(Boolean(cookie.load(TypeCookiesUtil.user_checkbox_save)));
		}
	}, []);
	return (
		<div className={styles.dang_nhap}>
			<div className={styles.herader_dangnhap}>
				<img alt={logo} src={logo} />
				<div className={styles.verticalLine}>
					<p>
						<b>Hãy đăng nhập để vào trang quản trị của bạn !</b>
					</p>
				</div>
				<div />
				<hr />
			</div>
			<div className={styles.title}>
				<h3>ĐĂNG NHẬP VỚI EMAIL VÀ SỐ ĐIỆN THOẠI</h3>
			</div>
			<div className={styles.form_dang_nhap}>
				<div className={styles.item_form_dang_nhap} style={{ marginTop: '45px' }}>
					<div className={styles.input_field}>
						<input
							id="email"
							value={userAdmin}
							onChange={(e) => onChangeText(e, TypeInput.user)}
							required
						/>
						<label htmlFor="email" style={{ width: '140px' }}>
							Email hoặc SĐT
						</label>
					</div>
				</div>
				<div className={styles.item_form_dang_nhap}>
					<div className={styles.input_field}>
						<input
							type={passView ? 'password' : 'Text'}
							id="pass"
							value={password}
							onChange={(e) => onChangeText(e, TypeInput.password)}
							required
						/>
						<label htmlFor="password" style={{ width: '100px' }}>
							Password
						</label>
						<span onClick={ShowPassword}>
							{passView === true ? <EyeInvisibleOutlined /> : <EyeOutlined />}
						</span>
					</div>
				</div>
				<div className={styles.item_form_dang_nhap} style={{ marginTop: '15px' }}>
					<div className={styles.action_dang_nhap}>
						<Checkbox
							onChange={handleSaveUserPass}
							checked={checkBox}
							disabled={password.length === 0 || userAdmin.length === 0}
						>
							Lưu mật khẩu cho lần đăng nhập tiếp theo
						</Checkbox>
						{/*<Link to={'/registerAdmin'}>*/}
						{/*	<div*/}
						{/*		style={{*/}
						{/*			color: '#45c326',*/}
						{/*			textDecoration: 'underline',*/}
						{/*			cursor: 'pointer',*/}
						{/*		}}*/}
						{/*	>*/}
						{/*		Register now !*/}
						{/*	</div>*/}
						{/*</Link>*/}
					</div>
				</div>
				<div className={styles.item_form_dang_nhap}>
					<div className={styles.action_dang_nhap}>
						<button onClick={onSave}>Đăng nhập</button>
					</div>
				</div>
			</div>
		</div>
	);
}

LoginAdmin.propTypes = {};

LoginAdmin.defaultProps = {};

export default React.memo(LoginAdmin);
