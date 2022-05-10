import React, { useState } from 'react';
import { Checkbox, message as messageAnt } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AddUser } from '../../actions/userAction';
import baseAPI from '../../axios/baseAPI';
import { TypeApi } from '../../util/TypeApi';

// style
import logo from '../../img/logotet2019.png';
import style from './style.module.css';
import 'antd/dist/antd.css';
import styles from '../Login/index.module.css';
import { GoogleLogin } from 'react-google-login';
import {
	createFromIconfontCN,
	EyeInvisibleOutlined,
	EyeOutlined,
	GooglePlusOutlined,
} from '@ant-design/icons';

// const
const TypeInput = {
	name: 'name',
	email: 'email',
	phone: 'phone',
	password: 'password',
};
const IconFont = createFromIconfontCN({
	scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
function Register() {
	// state
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [checkBox, setCheckBox] = useState(false);
	const [passView, setPassView] = useState(true);

	// hook
	const dispatch = useDispatch();
	const history = useHistory();
	const onChangeText = (event, type) => {
		switch (type) {
			case TypeInput.name:
				setName(event.target.value);
				break;
			case TypeInput.email:
				setEmail(event.target.value);
				break;
			case TypeInput.phone:
				setPhone(event.target.value);
				break;
			case TypeInput.password:
				setPassword(event.target.value);
				break;
			default:
				// code block
				break;
		}
	};
	const ShowPassword = () => {
		if (passView) {
			setPassView(false);
		} else {
			setPassView(true);
		}
	};
	const onChangeCheck = (e) => {
		console.log(`checked = ${e.target.checked}`);
		setCheckBox(e.target.checked);
	};
	const handleReset = () => {
		setEmail('');
		setName('');
		setPassword('');
		setPhone('');
	};
	const onCreate = async () => {
		if (name && email && phone && password) {
			const data = {
				name,
				email,
				phone,
				password,
			};
			const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			const phoneFilter = /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(phone);
			if (!filter.test(email)) {
				messageAnt.warn('Email không hợp lệ!');
			} else if (!phoneFilter) {
				messageAnt.warn('Số điện thoại không hợp lệ!');
			} else if (!checkBox) {
				messageAnt.warn(
					'Bạn phải chấp nhận điều khoản của chúng tôi mới có thể đăng ký được !'
				);
			} else {
				const { message, user } = await baseAPI.add(TypeApi.user, data);
				if (message === 'SUCCESS') {
					await dispatch(AddUser(user));
					messageAnt.success('Đăng ký thành công');
					history.push('/login');
					handleReset();
				} else {
					messageAnt.warn(message);
				}
			}
		} else {
			messageAnt.warn('Không được bỏ trống thông tin nào !');
		}
	};
	const responseGoogle = (response) => {
		console.log(response);
	};
	return (
		<div className={style.dang_ky}>
			<div className={style.herader_dangky}>
				<Link to={'/'}>
					<img src={logo} alt={'xx'} />
				</Link>
				<div className={style.verticalLine}>
					<p>
						<b>Chào mừng bạn quay trở lại</b>
					</p>
				</div>
			</div>
			<div>
				<hr />
			</div>
			<div className={style.titell}>
				<h3>TẠO MỘT TÀI KHOẢN MỚI</h3>
			</div>
			<div className={style.form_dangky}>
				{/*<form>*/}
				<div className={style.item_form_dang_ky} style={{ marginTop: '25px' }}>
					<div className={style.title_dang_ky}>Tên đăng ký :</div>
					<div className={style.input_field}>
						<input
							value={name}
							type="text"
							id="name"
							onChange={(e) => onChangeText(e, TypeInput.name)}
							required
						/>
						<label htmlFor="name">User name</label>
					</div>
				</div>
				<div className={style.item_form_dang_ky}>
					<div className={style.title_dang_ky}>Email :</div>
					<div className={style.input_field}>
						<input
							value={email}
							type="email"
							id="email"
							onChange={(e) => onChangeText(e, TypeInput.email)}
							required
						/>
						<label
							htmlFor="email"
							style={{
								width: '60px',
								top: email && 0,
								color: email && '#00dd22',
								fontSize: email && '14px',
								zIndex: email && 1,
							}}
						>
							Email
						</label>
					</div>
				</div>
				<div className={style.item_form_dang_ky}>
					<div className={style.title_dang_ky}>Số điện thoại :</div>
					<div className={style.input_field}>
						<input
							value={phone}
							type="number"
							id="sdt"
							onChange={(e) => onChangeText(e, TypeInput.phone)}
							required
						/>
						<label htmlFor="sdt" style={{ width: '140px' }}>
							Phone number
						</label>
					</div>
				</div>
				<div className={style.item_form_dang_ky}>
					<div className={style.title_dang_ky}>Mật khẩu :</div>
					<div className={style.input_field}>
						<input
							value={password}
							type={passView ? 'password' : 'Text'}
							id="pass"
							onChange={(e) => onChangeText(e, TypeInput.password)}
							required
						/>
						<label htmlFor="password" style={{ width: '100px' }}>
							Password
						</label>
						<span onClick={ShowPassword}>
							{passView === true ? <EyeInvisibleOutlined /> : <EyeOutlined />}
							{/*<EyeInvisibleOutlined />*/}
						</span>
					</div>
				</div>
				<div className={style.item_form_dang_ky}>
					<div className={style.action_dang_ky}>
						{/* XXX */}
						<Checkbox onChange={onChangeCheck}>
							Tôi đồng ý với các điều khoản quy định sử dụng của trang web
						</Checkbox>
					</div>
				</div>
				<div className={style.item_form_dang_ky}>
					<div className={style.action_dang_ky}>
						<button onClick={onCreate}>Tạo một tài khoản mới</button>
					</div>
				</div>
				<Link to={'/login'}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							color: '#39ae05',
							textDecorationLine: 'underline',
						}}
					>
						Login
					</div>
				</Link>
				<div className={styles.login_social}>
					<div className={styles.IFLxoY}>
						<div className={styles._3svg61} />
						<span className={styles._1ZEpVL}>HOẶC</span>
						<div className={styles._3svg61} />
					</div>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						{/* <SocialButton*/}
						{/*	provider="facebook"*/}
						{/*	appId="YOUR_APP_ID"*/}
						{/*	onLoginSuccess={handleSocialLogin}*/}
						{/*	onLoginFailure={handleSocialLoginFailure}*/}
						{/* >*/}
						<div className={styles.login_fb}>
							<div>
								<span className={styles.login_social_icon}>
									<IconFont type="icon-facebook" />
								</span>
								<span className={styles.login_social_text}>Facebook</span>
							</div>
						</div>
						{/*</SocialButton>*/}
						<GoogleLogin
							clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
							render={(renderProps) => (
								<div className={styles.login_gg} onClick={renderProps.onClick}>
									<div>
										<span className={styles.login_social_icon}>
											<GooglePlusOutlined />
										</span>
										<span className={styles.login_social_text}>Google</span>
									</div>
								</div>
							)}
							buttonText="Login"
							onSuccess={responseGoogle}
							onFailure={responseGoogle}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
				</div>
				{/*</form>*/}
			</div>
		</div>
	);
}

export default React.memo(Register);
