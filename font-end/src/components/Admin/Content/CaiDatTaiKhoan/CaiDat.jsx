/* eslint-disable */
import React from 'react';
import {
	Button,
	DatePicker,
	Form,
	Input,
	Modal,
	Radio,
	Select,
	Switch,
	Upload,
	message,
} from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {BASE_URL_IMAGE, TYPE_STORE} from '../../../../util/TypeApi';
import style from './styles.module.css';
import {useSelector} from "react-redux";
import useUserAdminLogicData from "../../../../hooks/useUserAdminLogicData";
import UploadFileView from "../../../../baseComponent/UploadFileView";
// import PropTypes from 'prop-types';
const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
		number: '${label} is not a valid number!',
	},
	number: {
		range: '${label} must be between ${min} and ${max}',
	},
};
const { Option } = Select;
function CaiDat() {
	const [form] = Form.useForm();
	const [fileListUtil, setFileListUtil] = React.useState([]);
	const [linkFileUtil, setLinkFileUtil] = React.useState('');

	// hooks
	const accountAdmin = useSelector((state) => state[TYPE_STORE.accountAdmin]);
	const {updateUserAdmin} = useUserAdminLogicData();

	// handle func
	const onFinish = (values) => {
		const dataUpdate = {...accountAdmin, ...values};
		dataUpdate['avatar'] = linkFileUtil;
		if (dataUpdate.new_password === dataUpdate.check_new_password) {
			updateUserAdmin(dataUpdate).catch(err => console.log(err))
		} else {
			message.warn('Mật khẩu không trùng nhau!');
		}
	};

	// JSX
	React.useEffect(() => {
		form.setFieldsValue(accountAdmin);
		setFileListUtil([
			{
				uid: '-1',
				name: accountAdmin.avatar,
				status: 'done',
				url: BASE_URL_IMAGE + accountAdmin.avatar,
			},
		]);
		setLinkFileUtil(accountAdmin.avatar);
	}, []);

	return (
		<div className={style.my_account_profile}>
			<div className={style.my_account_section__header}>
				<div className={style.my_account_section__header_left}>
					<div className={style.my_account_section__header_title}>Hồ sơ của tôi</div>
					<div className={style.my_account_section__header_subtitle}>
						Quản lý thông tin hồ sơ để bảo mật tài khoản
					</div>
				</div>
			</div>
			<div className={style.form_account_admin}>
				<Form
					name="nest-messages"
					onFinish={onFinish}
					validateMessages={validateMessages}
					form={form}
				>
					<div className={style.content_left}>
						<div className={style.my_account_profile__left}>
							{/*<div className={style.my_account_profile__left_item}>*/}
							{/*	<div className={style.my_account_profile__left_item_title}>*/}
							{/*		Tên đăng nhập :*/}
							{/*	</div>*/}
							{/*	<div className={style.my_account_profile__left_item_input}>*/}
							{/*		<Form.Item>*/}
							{/*			<div style={{ marginTop: '0px' }}>Maisumule</div>*/}
							{/*		</Form.Item>*/}
							{/*	</div>*/}
							{/*</div>*/}
							<div className={style.my_account_profile__left_item}>
								<div className={style.my_account_profile__left_item_title}>Tên :</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name={'name'}>
										<Input />
									</Form.Item>
								</div>
							</div>
							<div className={style.my_account_profile__left_item}>
								<div className={style.my_account_profile__left_item_title}>Email :</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name={'email'}>
										<Input />
									</Form.Item>
								</div>
							</div>
							<div className={style.my_account_profile__left_item}>
								<div className={style.my_account_profile__left_item_title}>
									Số điện thoại :
								</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name="phone">
										<Input
											// addonBefore={prefixSelector}
											style={{ width: '100%' }}
										/>
									</Form.Item>
								</div>
							</div>
							<div className={style.my_account_profile__left_item}>
								<div className={style.my_account_profile__left_item_title}>
									Giới tính :
								</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name={'gender'}>
										<Radio.Group >
											<Radio value={'Nam'}>Nam</Radio>
											<Radio value={'Nữ'}>Nữ</Radio>
											<Radio value={'Khác'}>Khác</Radio>
										</Radio.Group>
									</Form.Item>
								</div>
							</div>
							{/*<div className={style.my_account_profile__left_item}>*/}
							{/*	<div className={style.my_account_profile__left_item_title}>*/}
							{/*		Ngày sinh :*/}
							{/*	</div>*/}
							{/*	<div className={style.my_account_profile__left_item_input}>*/}
							{/*		<Form.Item name={'date_of_birth'}>*/}
							{/*			<DatePicker*/}
							{/*				format={'DD-MM-YYYY'}*/}
							{/*			// value={date}*/}
							{/*			// defaultValue={date}*/}
							{/*			// onChange={onChangeDate}*/}
							{/*			/>*/}
							{/*		</Form.Item>*/}
							{/*	</div>*/}
							{/*</div>*/}
							<div className={style.my_account_profile__left_item}>
								<div className={style.my_account_profile__left_item_title}>Địa chỉ :</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name={'address'}>
										<Input.TextArea />
									</Form.Item>
								</div>
							</div>
							<div className={style.my_account_profile__left_item}>
								<div className={style.my_account_profile__left_item_title}>Chức vụ :</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name="position" rules={[{ required: true }]}>
										<Select allowClear disabled>
											<Option value="quanly">Quản lý </Option>
											<Option value="nhanvien">Nhân viên </Option>
											<Option value="ketoan">Kế toán </Option>
										</Select>
									</Form.Item>
								</div>
							</div>
							{/*<div className={style.my_account_profile__left_item}>*/}
							{/*	<div className={style.my_account_profile__left_item_title}>*/}
							{/*		Trạng thái :*/}
							{/*	</div>*/}
							{/*	<div className={style.my_account_profile__left_item_input}>*/}
							{/*		<Switch defaultChecked onChange={onChangeStatus} />*/}
							{/*	</div>*/}
							{/*</div>*/}
						</div>
						<div className={style.my_account_profile__right}>
							{/*mk hiển thị trang hồ sơ*/}
							<div
								className={style.my_account_profile__left_item}
								id="left_item_password_1"
							>
								<div className={style.my_account_profile__left_item_title}>
									Mật khẩu HT:
								</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name={'old_password'}>
										<Input.Password
											prefix={<LockOutlined className="site-form-item-icon" />}
											type="password"
											placeholder="Password"
										/>
									</Form.Item>
								</div>
							</div>
							{/*mk hiển thị trang chỉnh sửa hồ sơ*/}
							<div
								className={style.my_account_profile__left_item}
								id="left_item_password_2"
							>
								<div className={style.my_account_profile__left_item_title}>
									Mật khẩu mới :
								</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name={'new_password'}>
										<Input.Password
											prefix={<LockOutlined className="site-form-item-icon" />}
											type="password"
											placeholder="Password"
										/>
									</Form.Item>
								</div>
							</div>
							<div
								className={style.my_account_profile__left_item}
								id="left_item_password_3"
							>
								<div className={style.my_account_profile__left_item_title}>
									Nhập lại mật khẩu :
								</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item name={'check_new_password'}>
										<Input.Password
											prefix={<LockOutlined className="site-form-item-icon" />}
											type="password"
											placeholder="Password"
										/>
									</Form.Item>
								</div>
							</div>
							{/*het pass*/}
							<div className={style.my_account_profile__left_item}>
								<div className={style.my_account_profile__left_item_title}>
									Ảnh avatar :
								</div>
								<div className={style.my_account_profile__left_item_input}>
									<Form.Item>
										<UploadFileView
											setFileListUtil={setFileListUtil}
											setLinkFileUtil={setLinkFileUtil}
											fileListUtil={fileListUtil}
											linkFileUtil={linkFileUtil}
										/>
									</Form.Item>
									<div>
										Dung lượng file tối đa 2 MB
										<br />
										Định dạng:.JPEG, .PNG
									</div>
									<div style={{ color: '#f65353', display: 'none' }} id="chu_y">
										* Click vào ảnh để thay đổi avatar
									</div>
								</div>
							</div>
							<div className={style.my_account_profile__left_item}>
								<div className={style.my_account_profile__left_item_title}>
									<Button
										id="left_item_password_4"
										htmlType="submit"
										style={{ backgroundColor: '#ee4d2d', color: '#fff' }}
									>
										Lưu
									</Button>
								</div>
							</div>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

CaiDat.propTypes = {};

CaiDat.defaultProps = {};

export default React.memo(CaiDat);
