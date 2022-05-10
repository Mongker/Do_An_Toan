/* eslint-disable */
import React, { useState } from 'react';
import moment from 'moment';
import style from './style.module.scss';
import {
	CopyOutlined,
	DeleteOutlined,
	EditOutlined,
	UserOutlined,
} from '@ant-design/icons';
import {
	Avatar,
	Button,
	Form,
	Input,
	message,
	Modal,
	Popconfirm,
	Select,
	Space,
	Switch,
	Table,
} from 'antd';
import UploadFileView from '../../../../baseComponent/UploadFileView';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useUserAdminLogicData from '../../../../hooks/useUserAdminLogicData';
import { BASE_URL_IMAGE } from '../../../../util/TypeApi';
// import PropTypes from 'prop-types';
const { Option } = Select;
const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};
function FormChung(props) {
	const { userAdmin } = props;
	const [formEdit] = Form.useForm();
	const [modal1Visible, setModal1Visible] = useState(false);
	const [modal2Visible, setModal2Visible] = useState(false);
	const [visibleCopy, setVisibleCopy] = useState(false);
	const [linkFileUtil, setLinkFileUtil] = useState('');
	const [fileListUtil, setFileListUtil] = useState([]);
	const { postUserAdmin, deleteUserAdmin, updateUserAdmin } = useUserAdminLogicData();
	const [status, setStatus] = useState(true);
	const [dataUserAdminEdit, setDataUserAdminEdit] = useState(null);
	const columns = [
		{
			title: 'Ảnh',
			width: 100,
			dataIndex: 'avatar',
			key: 'avatar',
			fixed: 'left',
			render: (avatar) => (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Avatar size="large" icon={<UserOutlined />} src={BASE_URL_IMAGE + avatar} />
				</div>
			),
		},
		{
			title: 'Tên',
			width: 250,
			dataIndex: 'name',
			fixed: 'left',
		},
		{
			title: 'Giới tính',
			width: 100,
			dataIndex: 'gender',
			key: '1',
		},
		{
			title: 'Ngày sinh',
			// dataIndex: 'date_of_birth',
			key: '2',
			width: 150,
			render: (record) => {
				const date = moment(new Date(record.date_of_birth)).format('DD-MM-YYYY');
				return <div>{date}</div>;
			},
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: '3',
			width: 250,
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phone',
			key: '4',
			width: 150,
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: '5',
			width: 300,
		},
		// {
		// 	title: 'Mật khẩu',
		// 	// dataIndex: 'password',
		// 	key: '6',
		// 	width: 150,
		// 	render: (record) => {
		// 		return (
		// 			<input
		// 				disabled
		// 				type="password"
		// 				value={record.password}
		// 				style={{ backgroundColor: '#fff !important' }}
		// 			/>
		// 		);
		// 	},
		// },
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: '7',
			width: 150,
			render: (status) => {
				if (status === true) {
					return <div>Đang hoạt động</div>;
				} else if (status === false) {
					return <div>Tài khoản đã bị khóa</div>;
				}
			},
		},
		{
			title: 'Chức vụ',
			dataIndex: 'position',
			key: '8',
			width: 250,
		},
		{
			title: 'Hành động',
			key: 'action',
			fixed: 'right',
			width: 120,
			render: (record) => (
				<Space size="middle">
					<Button
						icon={<EditOutlined style={{ color: '#5cc826' }} />}
						type="text"
						onClick={() => setModalVisible1(record)}
					/>
					<Popconfirm
						title="Are you sure？"
						okText="Yes"
						cancelText="No"
						onConfirm={() => confirmDelete(record._id)}
					>
						<Button icon={<DeleteOutlined style={{ color: '#d72a39' }} />} type="text" />
					</Popconfirm>
				</Space>
			),
		},
	];
	// document.getElementById('add_search').style.display = 'block';
	const PassDefault = '12345@2021';
	const setModalVisible1 = (record) => {
		setModal1Visible(true);
		setDataUserAdminEdit(record);
		formEdit.setFieldsValue({ ...record });
		setLinkFileUtil(record.avatar);
		setFileListUtil([
			{
				uid: record._id,
				name: record.avatar,
				status: 'done',
				url: BASE_URL_IMAGE + record.avatar,
			},
		]);
	};
	const confirmDelete = (id) => {
		deleteUserAdmin(id);
	};
	const onFinishEdit = (values) => {
		values['avatar'] = linkFileUtil;
		if (linkFileUtil) {
			updateUserAdmin({ ...dataUserAdminEdit, ...values });
		} else {
			message.warn('Thiếu ảnh đi kèm');
		}
		onReset();
	};
	const onReset = () => {
		formEdit.resetFields();
		setLinkFileUtil('');
		setFileListUtil([]);
		setModal2Visible(false);
		setModal1Visible(false);
	};
	const handleSwitch = (checked) => {
		formEdit.setFieldsValue({
			status: checked,
		});
	};
	const handleResetPass = () => {
		formEdit.setFieldsValue({
			password: PassDefault,
		});
		setVisibleCopy(!visibleCopy);
		message.success('Đã Reset');
	};
	return (
		<div className={style.content_user}>
			{/*Table User Admin */}
			<div className={style.table_user}>
				<Table
					columns={columns}
					dataSource={userAdmin}
					scroll={{ x: 1500, y: 350 }}
					sticky
					style={{ height: '100%', width: '100%' }}
				/>
			</div>
			{/*Modal edit*/}
			<Modal
				title={
					<div style={{ display: 'flex', justifyContent: 'center' }}>SỬA NHÂN VIÊN</div>
				}
				centered
				visible={modal1Visible}
				footer={null}
				onCancel={() => setModal1Visible(false)}
			>
				<Form {...layout} form={formEdit} name="control-hooks" onFinish={onFinishEdit}>
					<Form.Item name="image_link" label="Ảnh :">
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
					<Form.Item
						name="gender"
						label="Giới tính :"
						rules={[{ required: true }]}
						placeholder="Chọn..."
					>
						<Select allowClear placeholder="Chọn...">
							<Option value="Nam">Nam</Option>
							<Option value="Nữ">Nữ</Option>
							<Option value="Khác">Khác</Option>
						</Select>
					</Form.Item>
					{/*<Form.Item name="date_of_birth" label="Ngày sinh : ">*/}
					{/*	<DatePicker />*/}
					{/*</Form.Item>*/}
					<Form.Item name="email" label="Email :" rules={[{ type: 'email' }]}>
						<Input />
					</Form.Item>
					<Form.Item name="status" label="Tắt/Bật User" style={{ marginLeft: '10px' }}>
						{modal1Visible && <Switch defaultChecked={status} onChange={handleSwitch} />}
					</Form.Item>
					<Form.Item label="Password" name="password">
						<Popconfirm
							title="Bạn muốn reset lại mật khẩu ?"
							okText="Yes"
							cancelText="No"
							onConfirm={handleResetPass}
						>
							<Button type={'danger'}>Reset</Button>
						</Popconfirm>{' '}
						{visibleCopy && (
							<CopyToClipboard text={PassDefault}>
								<Button
									type={'default'}
									onClick={() => message.success('Copy thành công')}
								>
									{PassDefault} <CopyOutlined />
								</Button>
							</CopyToClipboard>
						)}
					</Form.Item>
					<Form.Item
						name="phone"
						label="Số điện thoại :"
						rules={[{ required: true, message: 'Please input your phone number!' }]}
					>
						<Input style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="address" label="Địa chỉ :">
						<Input.TextArea />
					</Form.Item>
					<Form.Item
						name="position"
						label="Chức vụ :"
						rules={[{ required: true }]}
						placeholder="Chọn..."
					>
						<Select allowClear placeholder="Chọn...">
							<Option value="Quản lý">Quản lý </Option>
							<Option value="Nhân viên">Nhân viên </Option>
							<Option value="Kế toán">Kế toán </Option>
						</Select>
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
							Cập nhật
						</Button>
						<Button htmlType="button" onClick={onReset}>
							Reset
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

FormChung.propTypes = {};

FormChung.defaultProps = {};

export default React.memo(FormChung);
