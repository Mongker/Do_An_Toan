/* eslint-disable */
import React, { useState } from 'react';
import { Checkbox, message as messageAnt } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

// style
import logo from '../../../img/logotet2019.png';
import style from './Styles.module.scss';

// const
const TypeInput = {
	name: 'name',
	email: 'email',
	phone: 'phone',
	password: 'password',
};
function RegisterAdmin() {
	// state
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

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
			// const { message, user } = await baseAPI.add(TypeApi.user, data);
			// if (message === 'SUCCESS') {
			// 	await dispatch(AddUser(user));
			// 	messageAnt.success('Đăng ký thành công');
			// 	history.push('/login');
			// } else {
			// 	messageAnt.warn(message);
			// }
		} else {
			messageAnt.warn('Không được bỏ trống thông tin nào !');
		}
		handleReset();
	};
	return (
		<div className={style.dang_ky}>
			<div className={style.herader_dangky}>
				<Link to={'/'}>
					<img src={logo} />
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
						<label htmlFor="email" style={{ width: '60px' }}>
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
							type="password"
							id="pass"
							onChange={(e) => onChangeText(e, TypeInput.password)}
							required
						/>
						<label htmlFor="password" style={{ width: '100px' }}>
							Password
						</label>
					</div>
				</div>
				<div className={style.item_form_dang_ky}>
					<div style={{ marginLeft: 50 }}>
						<Checkbox>
							Tôi đồng ý với các điều khoản quy định sử dụng của trang web
						</Checkbox>
						<Link to={'/admin'}>
							<div
								style={{
									color: '#45c326',
									textDecoration: 'underline',
									cursor: 'pointer',
									paddingLeft: 190,
								}}
							>
								Login now !
							</div>
						</Link>
					</div>
				</div>
				<div className={style.item_form_dang_ky}>
					<div className={style.action_dang_ky}>
						<button onClick={onCreate}>Tạo một tài khoản mới</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(RegisterAdmin);
