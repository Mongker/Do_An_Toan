/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Select, Tabs, DatePicker } from 'antd';
import FormChung from './FormChung';
import style from './style.module.scss';
import { useSelector } from 'react-redux';
import { TYPE_STORE } from '../../../../util/TypeApi';
import { HeartTwoTone, SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import UploadFileView from '../../../../baseComponent/UploadFileView';
import useUserAdminLogicData from '../../../../hooks/useUserAdminLogicData';
const { Option } = Select;
const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};
const { TabPane } = Tabs;
// import PropTypes from 'prop-types';
function User() {
	const [form] = Form.useForm();
	const [data, setData] = useState(null);
	const [linkFileUtil, setLinkFileUtil] = useState('');
	const [fileListUtil, setFileListUtil] = useState([]);
	const [modal2Visible, setModal2Visible] = useState(false);
	const { postUserAdmin } = useUserAdminLogicData();
	const [status, setStatus] = useState(true);
	const userAdmin = useSelector((state) => state[TYPE_STORE.userAdmin]);
	const newUserAdmin = Object.values(userAdmin).reverse();
	const findManager = newUserAdmin.filter((item) => item.position === 'Quản lý');
	const findAccountant = newUserAdmin.filter((item) => item.position === 'Kế toán');
	const findStaff = newUserAdmin.filter((item) => item.position === 'Nhân viên');
	const PassDefault = '12345@2021';
	const callback = (key) => {
		switch (key) {
			case '1':
				setData({ newUserAdmin });
			case '2':
				setData([...findManager]);
				break;
			case '3':
				setData([...findAccountant]);
				break;
			case '4':
				setData([...findStaff]);
				break;
			default:
				return newUserAdmin;
		}
	};
	const setModalVisible2 = (modal2Visible) => {
		setModal2Visible(modal2Visible);
	};
	const onFinishAdd = (values) => {
		values['avatar'] = linkFileUtil;
		values['password'] = PassDefault;
		values['status'] = status;
		if (linkFileUtil) {
			postUserAdmin(values);
		} else {
			message.warn('Thiếu ảnh đi kèm');
		}
		onReset();
	};
	const onReset = () => {
		form.resetFields();
		setLinkFileUtil('');
		setFileListUtil([]);
		setModal2Visible(false);
	};
	useEffect(() => {
		callback();
	}, [data]);
	return (
		<div>
			<div className={style.filter_user_content}>
				<div className={style.box}>
					<div className={style.container_2}>
						<span className={style.icon}>
							<SearchOutlined className={style.icon_search} />
						</span>
						<input type="search" className={style.input_search} placeholder="Search..." />
					</div>
				</div>
				<div>
					<Button
						icon={<UserAddOutlined />}
						className={style.button_user_add}
						onClick={() => setModalVisible2(true)}
					>
						Add user
					</Button>
					{/*Modal add*/}
					<Modal
						title={
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								THÊM NHÂN VIÊN
							</div>
						}
						centered
						visible={modal2Visible}
						footer={null}
						onCancel={() => setModal2Visible(false)}
					>
						<Form {...layout} form={form} name="control-hooks" onFinish={onFinishAdd}>
							<Form.Item name="avatar" label="Ảnh :">
								<UploadFileView
									linkFileUtil={linkFileUtil}
									fileListUtil={fileListUtil}
									setLinkFileUtil={setLinkFileUtil}
									setFileListUtil={setFileListUtil}
								/>
							</Form.Item>
							<Form.Item name="name" label="Tên :" rules={[{ required: true }]}>
								<Input />
							</Form.Item>
							<Form.Item name="gender" label="Giới tính :">
								<Select allowClear placeholder="Chọn...">
									<Option value="Nam">Nam</Option>
									<Option value="Nữ">Nữ</Option>
									<Option value="Khác">Khác</Option>
								</Select>
							</Form.Item>
							<Form.Item name="date_of_birth" label="Ngày sinh : ">
								<DatePicker />
							</Form.Item>
							<Form.Item
								name="email"
								label="Email :"
								rules={[{ required: true, type: 'email' }]}
							>
								<Input />
							</Form.Item>
							<Form.Item label="Mật khẩu :" name="password">
								<Input defaultValue={PassDefault} disabled={true} />
							</Form.Item>
							<Form.Item
								name="phone"
								label="Số điện thoại :"
								// rules={[
								// 	{
								// 		// required: true,
								// 		message: 'Please input your phone number!',
								// 		type: 'number',
								// 	},
								// ]}
							>
								<Input style={{ width: '100%' }} />
							</Form.Item>
							<Form.Item name="address" label="Địa chỉ :">
								<Input.TextArea />
							</Form.Item>
							<Form.Item name="position" label="Chức vụ :" rules={[{ required: true }]}>
								<Select allowClear placeholder="Chọn...">
									<Option value="Quản lý">Quản lý </Option>
									<Option value="Kế toán">Kế toán </Option>
									<Option value="Nhân viên">Nhân viên </Option>
								</Select>
							</Form.Item>
							<Form.Item {...tailLayout}>
								<Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
									Lưu
								</Button>
								<Button htmlType="button" onClick={onReset}>
									Reset
								</Button>
							</Form.Item>
						</Form>
					</Modal>
				</div>
				<div>
					<HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '30px' }} />
				</div>
			</div>
			<Tabs defaultActiveKey="1" onChange={(key) => callback(key)}>
				<TabPane tab="Tất cả" key="1">
					<FormChung userAdmin={newUserAdmin} />
				</TabPane>
				<TabPane tab="Quản lý" key="2">
					<FormChung userAdmin={data} />
				</TabPane>
				<TabPane tab="Kế toán" key="3">
					<FormChung userAdmin={data} />
				</TabPane>
				<TabPane tab="Nhân viên" key="4">
					<FormChung userAdmin={data} />
				</TabPane>
			</Tabs>
		</div>
	);
}

User.propTypes = {};

User.defaultProps = {};

export default React.memo(User);
