/* eslint-disable */
import React, { useState } from 'react';
import {
	Button,
	Table,
	Modal,
	Popconfirm,
	message,
	Input,
	InputNumber,
	Form,
	Select,
	Image,
	Tag,
	Upload,
} from 'antd';
import {
	DeleteOutlined,
	EditOutlined,
	ExclamationCircleOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import UploadFileView from '../../../../baseComponent/UploadFileView';
import EditorBase from '../../../../baseComponent/EditorBase';
import useCategoryLogicData from '../../../../hooks/useCategoryLogicData';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import useProductLogicData from '../../../../hooks/useProductLogicData';
import { BASE_URL_IMAGE } from '../../../../util/TypeApi';
import ConvertStringToVND from '../../../../util/ConvertStringToVND';
import ExportCSV from './ExportCSV/ExportCSV';
import style from './style.module.scss';
import { ContextApp } from '../../../../context/contextApp';
// import PropTypes from 'prop-types';

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const text = 'Bạn chắc chắn với thao tác này ?';
let dataSale = [];
for (let i = 0; i <= 100; i++) {
	dataSale.push(`${i} %`);
}

function SanPham() {
	// hooks
	const [form] = Form.useForm();
	const { category } = useCategoryLogicData();
	const { postProduct, product, deleteProduct, updateProduct } = useProductLogicData();
	const arrProduct = [];

	const refCallBack = React.useRef();
	const refCallBack2 = React.useRef();

	// context
	const { textSearch } = React.useContext(ContextApp);

	// state
	const [modalVisible, setModalVisible] = useState(false);
	const [linkFileUtil, setLinkFileUtil] = useState('');
	const [fileListUtil, setFileListUtil] = useState([]);
	const [fileListContentUtil, setFileListContentUtil] = useState([]); // [{}]
	const [listLinkFileUtil, setListLinkFileUtil] = useState([]); // ['image']
	const [description, setDescription] = useState('');
	const [dataProductEdit, setDataProductEdit] = useState(null);
	const [customers, setCustomers] = useState(arrProduct);
	const [fileList, setFileList] = useState([]);

	// handle func
	const productFilter = () => {
		let productNew = {};

		const priceString = (item) =>
			(item.price * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
		const arrSearch = Object.values(product).filter(
			(item) =>
				item.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
				priceString(item).toLowerCase().indexOf(`${textSearch}`.toLowerCase()) !== -1
		);
		arrSearch.map((item) => {
			productNew[item._id] = item;
		});
		return { ...productNew };
	};
	Object.values(productFilter()).map((item) => {
		try {
			arrProduct.push({ ...item, catalog_id: category[item.catalog_id].name });
		} catch (e) {
			console.log('e', e);
		}
		return item;
	});
	const ModalVisible = (modalVisible) => {
		setModalVisible(modalVisible);
	};
	const wscols = [
		{ wch: Math.max(...customers.map((customer) => customer._id.length)) },
		{ wch: Math.max(...customers.map((customer) => customer.name.length)) },
		{ wch: 70 },
		{ wch: 20 },
		{ wch: 20 },
		{ wch: 20 },
		{ wch: 30 },
		{ wch: 20 },
		{ wch: 30 },
		{ wch: 30 },
		{ wch: 30 },
		{ wch: 30 },
	];
	const handleEditProduct = (item) => {
		setDataProductEdit(item);
		setModalVisible(true);
		form.setFieldsValue({ ...item });
		setLinkFileUtil(item.image);
		setFileListUtil([
			{
				uid: item._id,
				name: item.image,
				status: 'done',
				url: BASE_URL_IMAGE + item.image,
			},
		]);
		setListLinkFileUtil(item.image_destination);
		const arrObjImg =
			item.image_destination &&
			item.image_destination.map((item) => ({
				uid: item,
				name: item,
				status: 'done',
				url: BASE_URL_IMAGE + item,
			}));
		setFileListContentUtil([...arrObjImg]);
		setDescription(item.description);
	};

	const confirm = (id) => {
		id && deleteProduct(id);
	};

	const onFinish = (values) => {
		values['description'] = description;
		values['image'] = linkFileUtil;
		values['image_destination'] = listLinkFileUtil;

		if (linkFileUtil && listLinkFileUtil.length > 0) {
			if (!dataProductEdit) {
				postProduct(values);
			} else {
				updateProduct({ ...dataProductEdit, ...values });
			}
			onCancel();
		} else {
			message.warn('Thiếu ảnh đi kèm');
		}
	};

	const onReset = () => {
		form.resetFields();
		setLinkFileUtil('');
		setDescription('');
		setFileListUtil([]);
		setDataProductEdit(null);
		setListLinkFileUtil([]);
		setFileListContentUtil([]);
		refCallBack.current && refCallBack.current.handleResetState();
		refCallBack2.current && refCallBack2.current.handleResetState();
	};
	const onResetEdit = () => {
		if (dataProductEdit) {
			form.setFieldsValue({ ...dataProductEdit });
		}
	};
	const onCancel = (close) => {
		setModalVisible(false);
		onReset();
	};
	const onNoCancel = (close) => {
		setModalVisible(true);
	};
	const handleCancelModal = () => {
		Modal.confirm({
			title: (
				<div style={{ fontWeight: 'bold', color: '#ef5029' }}>
					Bạn có chắc chắn muốn thoát không ?
				</div>
			),
			icon: <ExclamationCircleOutlined />,
			onOk: () => onCancel(close),
			onCancel: () => onNoCancel(close),
			okText: 'Có',
			cancelText: 'Không',
		});
	};
	const handleSelect = (optionA, optionB) => {
		return optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase());
	};

	// import excel
	const props = {
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		multiple: true,
		beforeUpload: (file) => {
			if (
				file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
			) {
				message.error(`${file.name} is not a excel file`);
			}
			return file.type ===
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
				? true
				: Upload.LIST_IGNORE;
		},
		onChange: (info) => {
			let fileList = [...info.fileList];

			// 1. Limit the number of uploaded files
			// Only to show two recent uploaded files, and old ones will be replaced by the new
			fileList = fileList.slice(-1);

			// 2. Read from response and show file link
			fileList = fileList.map((file) => {
				if (file.response) {
					// Component will show file.url as link
					file.url = file.response.url;
				}
				return file;
			});
			setFileList(fileList);
		},
	};
	const columns = [
		{
			title: 'Ảnh',
			width: 100,
			dataIndex: 'image',
			render: (image) => (
				<Image
					style={{ width: 80, height: 50, objectFit: 'cover' }}
					src={BASE_URL_IMAGE + image}
				/>
			),
		},
		{
			title: 'Tên sản phẩm',
			width: 200,
			dataIndex: 'name',
			render: (name, data) => {
				return (
					<>
						<p style={{ fontSize: 17, fontWeight: 'bold', color: 'green' }}>{name}</p>
						<i style={{ fontSize: 12, fontWeight: 'bold', color: 'black' }}>
							(
							{data.catalog_id &&
							category[data.catalog_id] &&
							category[data.catalog_id].name &&
							category[data.catalog_id].name}
							)
						</i>
					</>
				);
			},
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			width: 125,
			render: (price) => (
				<p style={{ fontSize: 14, fontWeight: 'bold', color: 'orange' }}>
					{ConvertStringToVND(price)}
				</p>
			),
		},
		{
			title: 'Tổng sản phẩm đã nhập',
			dataIndex: 'amount',
			width: 80,
		},
		{
			title: 'Số lượng còn',
			dataIndex: 'con_lai',
			width: 75,
			render: (_, data) => {
				return <>{data.amount - data.sold || 0}</>;
			},
		},
		{
			title: 'Đã bán',
			dataIndex: 'sold',
			width: 75,
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			width: 100,
			render: (_, data) => {
				const isStatus = data.amount - data.sold === 0;
				const text = isStatus ? 'Hết hàng' : 'Còn hàng';
				return (
					<p
						style={{
							fontSize: 14,
							fontWeight: 'bold',
							color: isStatus ? 'red' : 'green',
						}}
					>
						{text}
					</p>
				);
			},
		},
		{
			title: 'SALE',
			dataIndex: 'price_seo',
			width: 75,
			render: (price_seo) => <Tag color="blue">{price_seo}</Tag>,
		},
		{
			title: 'Hành động',
			width: 100,
			render: (_, data) => (
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<Button
						type="text"
						icon={<EditOutlined />}
						style={{ color: '#4cd3d7' }}
						onClick={() => handleEditProduct(data)}
					/>
					<Popconfirm
						placement="top"
						title={text}
						onConfirm={() => confirm(data._id)}
						okText="Yes"
						cancelText="No"
					>
						<Button type="text" icon={<DeleteOutlined />} style={{ color: '#ea506f' }} />
					</Popconfirm>
				</div>
			),
		},
	];
	const title = linkFileUtil.length > 0 ? 'SỬA SẢN PHẨM' : 'THÊM SẢN PHẨM';
	return (
		<div>
			<div>
				<div style={{ display: 'flex',justifyContent:'center'}}>
					<Button
						style={{
							marginBottom: 15,
							backgroundColor: '#ec6342',
							color: '#fff',
							marginRight: 5,
							borderRadius: 15,
						}}
						onClick={() => ModalVisible(true)}
					>
						Thêm sản phẩm
					</Button>
					{/*<Upload {...props} fileList={fileList}>*/}
					{/*	<Button*/}
					{/*		style={{*/}
					{/*			marginBottom: 15,*/}
					{/*			marginRight: 5,*/}
					{/*			backgroundColor: '#42ecec',*/}
					{/*			borderRadius: 15,*/}
					{/*		}}*/}
					{/*		icon={<UploadOutlined />}*/}
					{/*	>*/}
					{/*		Import excel*/}
					{/*	</Button>*/}
					{/*</Upload>*/}
					<ExportCSV csvData={customers} fileName="List_product" wscols={wscols} />
				</div>
				{/*modal them*/}
				<Modal
					title={
						<div style={{ display: 'flex', justifyContent: 'center', fontSize: '18px' }}>
							{title}
						</div>
					}
					centered
					visible={modalVisible}
					maskClosable={false}
					footer={null}
					onCancel={handleCancelModal}
				>
					<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
						<Form.Item
							name="name"
							label="Tên sản phẩm"
							rules={[{ required: true, message: 'Nhập tên sản phẩm! ' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item name="image" label="Ảnh sản phẩm">
							<UploadFileView
								linkFileUtil={linkFileUtil}
								fileListUtil={fileListUtil}
								setLinkFileUtil={setLinkFileUtil}
								setFileListUtil={setFileListUtil}
								refFunc={refCallBack}
							/>
						</Form.Item>
						<Form.Item name="image_destination" label="Ảnh đi kèm">
							<UploadFileView
								// linkFileUtil={linkFileUtil}
								fileListUtil={fileListContentUtil}
								listLinkFileUtil={listLinkFileUtil}
								// setLinkFileUtil={setLinkFileUtil}
								setFileListUtil={setFileListContentUtil}
								setListLinkFileUtil={setListLinkFileUtil}
								limit={10}
								refFunc={refCallBack2}
							/>
						</Form.Item>
						<Form.Item
							name="catalog_id"
							label="Danh mục"
							rules={[{ required: true, message: 'Chọn danh mục sản phẩm!' }]}
						>
							<Select
								showSearch
								style={{ width: 200 }}
								placeholder="Search to Select"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								filterSort={handleSelect}
							>
								{Object.values(category).map((item) => (
									<Select.Option value={item._id}>{item.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name="amount"
							label="Số lượng"
							rules={[{ required: true, message: 'Số lượng sản phẩm!' }]}
						>
							<InputNumber min={0} />
						</Form.Item>
						<Form.Item
							name="price"
							label="Giá tiền"
							rules={[{ required: true, message: 'Giá sản phẩm!' }]}
						>
							<InputNumber min={0} />
						</Form.Item>
						<Form.Item
							name="price_seo"
							label="SALE sản phẩm"
							rules={[{ required: true, message: 'Chọn sale!' }]}
						>
							<Select
								showSearch
								style={{ width: 200 }}
								placeholder="Chọn % giảm giá"
								optionFilterProp="children"
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								filterSort={handleSelect}
							>
								{dataSale.map((item) => (
									<Select.Option value={item}>{item}</Select.Option>
								))}
							</Select>
						</Form.Item>
						<div style={{ margin: 10 }}>
							<ErrorBoundary>
								<EditorBase content={description} setContent={setDescription} />
							</ErrorBoundary>
						</div>
						<Form.Item {...tailLayout}>
							<Button type="primary" htmlType="submit">
								Submit
							</Button>
							{dataProductEdit ? (
								<Button
									htmlType="button"
									style={{ marginLeft: 10 }}
									onClick={() => onResetEdit()}
								>
									Reset
								</Button>
							) : (
								<Button
									htmlType="button"
									style={{ marginLeft: 10 }}
									onClick={() => onReset(true)}
								>
									Reset
								</Button>
							)}
						</Form.Item>
					</Form>
				</Modal>
			</div>
			<div className={style.table_product}>
				<Table
					columns={columns}
					dataSource={Object.values(productFilter()).reverse()}
					scroll={{ y: 390 }}
					bordered={true}
				/>
			</div>
		</div>
	);
}

SanPham.propTypes = {};

SanPham.defaultProps = {};

export default React.memo(SanPham);
