/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
	Button,
	Form,
	Image,
	Input,
	InputNumber,
	message,
	Modal,
	Popconfirm,
	Table,
	Tag,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import UploadFileView from '../../../../baseComponent/UploadFileView';
import useSliderLogicData from '../../../../hooks/useSliderLogicData';
import { BASE_URL_IMAGE } from '../../../../util/TypeApi';
import style from './style.module.scss';
// import PropTypes from 'prop-types';
const layout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};
function Slider() {
	const [form] = Form.useForm();
	const [formEdit] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible1, setModalVisible1] = useState(false);
	const [linkFileUtil, setLinkFileUtil] = useState('');
	const [fileListUtil, setFileListUtil] = useState([]);
	const [dataSlidertEdit, setDataSlidertEdit] = useState(null);
	const [indexOld, setIndexOld] = useState(null);
	const [indexNew, setIndexNew] = useState(null);
	const { slider, deleteSlider, postSlider, updateSlider } = useSliderLogicData();
	const ArrSlider = Object.values(slider);
	const sliderLength = ArrSlider.length;
	const columns = [
		{
			title: 'Hình ảnh',
			dataIndex: 'image_link',
			key: 'image_link',
			width: 200,
			render: (image_link) => (
				<Image
					style={{ width: 168, height: 95, objectFit: 'cover' }}
					src={BASE_URL_IMAGE + image_link}
				/>
			),
		},
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Vị trí',
			dataIndex: 'index',
			key: 'index',
			width: 100,
			return: () => <Tag color="cyan-inverse">1</Tag>,
		},
		{
			title: 'Mô tả',
			dataIndex: 'destination',
			key: 'destination',
		},
		{
			title: 'Action',
			key: 'action',
			width: 100,
			render: (record) => (
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<Button
						type="text"
						style={{ color: '#4cd3d7' }}
						icon={<EditOutlined />}
						onClick={() => ModalVisible1(record)}
					/>
					<Popconfirm
						title="Are you sure to delete this task?"
						onConfirm={() => confirm(record._id)}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
					>
						<Button style={{ color: '#ea506f' }} type="text" icon={<DeleteOutlined />} />
					</Popconfirm>
				</div>
			),
		},
	];
	function confirm(id) {
		id && deleteSlider(id);
	}
	function cancel(e) {
		console.log(e);
		message.error('Click on No');
	}
	const ModalVisible1 = (record) => {
		setIndexOld(record.index);
		setModalVisible1(true);
		setDataSlidertEdit(record);
		formEdit.setFieldsValue({ ...record });
		setLinkFileUtil(record.image_link);
		setFileListUtil([
			{
				uid: record._id,
				name: record.image_link,
				status: 'done',
				url: BASE_URL_IMAGE + record.image_link,
			},
		]);
	};
	const ModalVisible = (modalVisible) => {
		setModalVisible(modalVisible);
	};
	const onFinishAdd = (values) => {
		values['image_link'] = linkFileUtil;
		values['index'] = sliderLength + 1;
		let isIndex = false;
		Object.values(slider).map((item) => item.index === values.index && (isIndex = true));
		if (!isIndex) {
			if (linkFileUtil) {
				postSlider(values);
				onReset();
			} else {
				message.warn('Thiếu ảnh đi kèm');
			}
		} else {
			message.warn('Vị trí đã tồn tại');
		}
	};
	const onFinishEdit = (values) => {
		values['image_link'] = linkFileUtil;
		if (linkFileUtil) {
			if (indexNew && indexOld && indexOld !== indexNew) {
				// tim phan tu co index trung voi index cua item dang sua va cap nhat lai index cho phan tu do
				const FilterItemIndex = ArrSlider.filter((item) => item.index === indexNew);
				FilterItemIndex[0]['index'] = indexOld;
				updateSlider({ ...FilterItemIndex });
				// cap nhat phan tu dang xet voi index moi
				values['index'] = indexNew;
				updateSlider({ ...dataSlidertEdit, ...values });
				onReset();
			} else {
				values['index'] = indexOld;
				updateSlider({ ...dataSlidertEdit, ...values });
				onReset();
			}
		} else {
			message.warn('Thiếu ảnh đi kèm');
		}
	};

	const onReset = () => {
		form.resetFields();
		setLinkFileUtil('');
		setFileListUtil([]);
		setModalVisible(false);
		setModalVisible1(false);
	};
	function onChangeInput(value) {
		setIndexNew(value);
	}
	return (
		<div>
			<Button
				style={{
					marginBottom: 15,
					backgroundColor: '#ec6342',
					color: '#fff',
					borderRadius: 15,
				}}
				onClick={() => ModalVisible(true)}
			>
				Thêm slider
			</Button>
			<div style={{ height: 450 }} className={style.table_slider}>
				<Table
					columns={columns}
					dataSource={Object.values(slider).reverse()}
					scroll={{ y: 380 }}
				/>
			</div>
			{/*modal them*/}
			<Modal
				title={
					<div style={{ display: 'flex', justifyContent: 'center', fontSize: '18px' }}>
						THÊM SLIDER
					</div>
				}
				centered
				visible={modalVisible}
				footer={null}
				onCancel={() => {
					setModalVisible(false);
					onReset();
				}}
			>
				<Form {...layout} form={form} name="control-hooks" onFinish={onFinishAdd}>
					<Form.Item name="image_link" label="Ảnh :">
						<UploadFileView
							linkFileUtil={linkFileUtil}
							fileListUtil={fileListUtil}
							setLinkFileUtil={setLinkFileUtil}
							setFileListUtil={setFileListUtil}
						/>
					</Form.Item>
					<Form.Item name="name" label="Tên slider :" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					{/*<Form.Item name="index" label="Vị trí :" rules={[{ required: true }]}>*/}
					{/*	<InputNumber min={1} max={10} onChange={onChangeInput} />*/}
					{/*</Form.Item>*/}
					<Form.Item name="destination" label="Mô tả :">
						<Input />
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
							Submit
						</Button>
						<Button htmlType="button" onClick={onReset}>
							Reset
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			{/*modal sua*/}
			<Modal
				title={
					<div style={{ display: 'flex', justifyContent: 'center', fontSize: '18px' }}>
						SỬA SLIDER
					</div>
				}
				centered
				visible={modalVisible1}
				footer={null}
				onCancel={onReset}
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
					<Form.Item name="name" label="Tên slider :" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item name="index" label="Vị trí :" rules={[{ required: true }]}>
						<InputNumber min={1} max={sliderLength} onChange={onChangeInput} />
					</Form.Item>
					<Form.Item name="destination" label="Mô tả :">
						<Input />
					</Form.Item>
					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit" style={{ marginRight: 15 }}>
							Submit
						</Button>
						<Button htmlType="button" onClick={onReset}>
							Đóng
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

Slider.propTypes = {};

Slider.defaultProps = {};

export default React.memo(Slider);
