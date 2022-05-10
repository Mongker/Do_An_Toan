/* eslint-disable */
import React, { useState } from 'react';
import logo from '../../../img/tong_tien.png';
// import PropTypes from 'prop-types';
import style from './styles.module.scss';
import { Tabs, List, Button, Image, Modal, Input, Form, message } from 'antd';
import useTransactionData from '../../../hooks/useTransactionData';
import useCartLogicData from '../../../hooks/useCartLogicData';
import useProductLogicData from '../../../hooks/useProductLogicData';
import ConvertStringToVND from '../../../util/ConvertStringToVND';
import TYPE_TRANSACTION from '../../../util/TypeDoDatHang';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';
import { StopOutlined } from '@ant-design/icons';
const ModalDetail = React.lazy(() => import('./Modal/ModalDetail'));
const { TabPane } = Tabs;
const { TextArea } = Input;

function DonHang() {
	const { getListTransaction, transaction, putTransaction } = useTransactionData();
	const { carts } = useCartLogicData();
	const { product } = useProductLogicData();

	// state
	const [type, setType] = React.useState(TYPE_TRANSACTION.ALL);
	const [itemCancel, setItemCancel] = React.useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [itemTransaction, setItemTransaction] = useState(null);
	const [valuesCancel, setValuesCancel] = useState('');

	//const
	const [form] = Form.useForm();
	const transactionFilter = () => {
		let arr = [...Object.values(transaction)];
		if (type !== 'Tất cả') {
			arr = Object.values(transaction).filter((item) => item.status_transaction === type);
		}
		return arr.reverse();
	};
	// const handleOk = () => {
	// 	itemCancel['status_transaction'] = TYPE_TRANSACTION.DA_HUY;
	// 	valuesCancel && (itemCancel['messageError'] = valuesCancel);
	// 	putTransaction(itemCancel, handleCancel);
	// };
	const handleOk = (values) => {
		itemCancel['status_transaction'] = TYPE_TRANSACTION.DA_HUY;
		if (values.messageError.length <= 5) {
			message.warning('Lý do tối thiểu 5 ký tự!');
		} else {
			itemCancel['messageError'] = values.messageError;
			putTransaction(itemCancel, handleCancel);
			handleCancel();
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	const handleCancel = () => {
		setIsModalVisible(false);
		setItemCancel(null);
		form.resetFields();
	};

	const HandleDetailTransaction = (item = null) => {
		setItemTransaction(item);
	};
	const onChangeCancel = (e) => {
		setValuesCancel(e.target.value);
	};
	const handleHuyDon = (item) => {
		setItemCancel(item);
		setIsModalVisible(true);
	};
	const handleDatLaiDonDaHuy = (item) => {
		item['status_transaction'] = TYPE_TRANSACTION.CHO_XAC_NHAN;
		item['messageError'] = '';
		putTransaction(item, handleCancel);
	};
	const handleImage = (cartId) => {
		return carts[cartId] && carts[cartId].product_id && product[carts[cartId].product_id]
			? BASE_URL_IMAGE + product[carts[cartId].product_id].image
			: 'https://blackmantkd.com/wp-content/uploads/2017/04/default-image.jpg';
	};

	// func
	const callback = (key) => {
		setType(key);
	};

	React.useEffect(() => {
		const data = { status_transaction: type };
		type === TYPE_TRANSACTION.ALL ? getListTransaction() : getListTransaction(data);
	}, [type]);

	// JSX
	const ListComponent = (item) => (
		<React.Fragment>
			{
				<List
					size="small"
					header={
						<div className={style.header_list}>
							<div className={style.header_don_hang}>Đơn hàng {item._id}</div>
							<div className={style.header_trang_thai}>{item.status_transaction}</div>
						</div>
					}
					footer={
						<div className={style.footer_list}>
							<div className={style.footer_list_one}>
								<div className={style.footer_logo}>
									<img src={logo} style={{ objectFit: 'cover' }} />
								</div>
								<span className={style.footer_tong_tien}>Tổng số tiền : </span>
								<span className={style.footer_tien}>
									{ConvertStringToVND(item.amount)}
								</span>
							</div>
							<div className={style.footer_action}>
								{item['status_transaction'] === TYPE_TRANSACTION.CHO_LAY_HANG ||
								item['status_transaction'] === TYPE_TRANSACTION.CHO_XAC_NHAN ? (
									<Button
										danger
										type="primary"
										// disabled={type === TYPE_TRANSACTION.ALL}
										onClick={() => handleHuyDon(item)}
									>
										Hủy đơn
									</Button>
								) : (
									<div />
								)}
								{item['status_transaction'] === TYPE_TRANSACTION.DA_HUY && (
									<div style={{ marginLeft: 10 }}>
										<Button
											type="primary"
											// disabled={type === TYPE_TRANSACTION.ALL}
											onClick={() => handleDatLaiDonDaHuy(item)}
										>
											Đặt lại
										</Button>
									</div>
								)}
								<Button
									className={style.btn_action}
									onClick={() => HandleDetailTransaction(item)}
								>
									Xem chi tiết đơn hàng
								</Button>
							</div>
						</div>
					}
					bordered
					dataSource={item.carts_id}
					renderItem={(cartId) => (
						<List.Item
							actions={[
								<div style={{ textDecoration: 'line-through' }}>
									{/*115.000<sup>đ</sup>*/}
								</div>,
								<div style={{ color: ' #f05d40' }}>
									{ConvertStringToVND(
										carts[cartId] &&
											carts[cartId].product_id &&
											product[carts[cartId].product_id] &&
											product[carts[cartId].product_id].price
									)}
									{/*<sup>đ</sup>*/}
								</div>,
							]}
						>
							<List.Item.Meta
								avatar={<Image width={100} height={50} src={handleImage(cartId)} />}
								title={
									carts[cartId] &&
									carts[cartId].product_id &&
									product[carts[cartId].product_id] &&
									product[carts[cartId].product_id].name
								}
								description={`Số lượng: ${carts[cartId] && carts[cartId].amount}`}
							/>
						</List.Item>
					)}
				/>
			}
		</React.Fragment>
	);
	return (
		<div className={style.purchase_list_page__tabs_container}>
			<div className={style.card_container}>
				<Tabs type="card" onChange={callback}>
					<TabPane tab={TYPE_TRANSACTION.ALL} key={TYPE_TRANSACTION.ALL}>
						{transactionFilter().map((item) => ListComponent(item))}
					</TabPane>
					<TabPane
						tab={TYPE_TRANSACTION.CHO_XAC_NHAN}
						key={TYPE_TRANSACTION.CHO_XAC_NHAN}
					>
						{transactionFilter().map((item) => ListComponent(item))}
					</TabPane>
					<TabPane
						tab={TYPE_TRANSACTION.CHO_LAY_HANG}
						key={TYPE_TRANSACTION.CHO_LAY_HANG}
					>
						{transactionFilter().map((item) => ListComponent(item))}
					</TabPane>
					<TabPane tab={TYPE_TRANSACTION.DANG_GIAO} key={TYPE_TRANSACTION.DANG_GIAO}>
						{transactionFilter().map((item) => ListComponent(item))}
					</TabPane>
					<TabPane tab={TYPE_TRANSACTION.DA_GIAO} key={TYPE_TRANSACTION.DA_GIAO}>
						{transactionFilter().map((item) => ListComponent(item))}
					</TabPane>
					<TabPane tab={TYPE_TRANSACTION.DA_HUY} key={TYPE_TRANSACTION.DA_HUY}>
						{transactionFilter().map((item) => ListComponent(item))}
					</TabPane>
				</Tabs>
			</div>
			<Modal
				title={
					<div style={{ color: '#ec2323', fontWeight: 'bold' }}>
						<StopOutlined style={{ color: '#ef2b2b', marginRight: 18 }} />
						Lý do hủy đơn?
					</div>
				}
				visible={isModalVisible}
				closable={false}
				footer={false}
			>
				<Form
					name="basic"
					wrapperCol={{ span: 24 }}
					initialValues={{ remember: true }}
					onFinish={handleOk}
					onFinishFailed={onFinishFailed}
					form={form}
				>
					<Form.Item
						name="messageError"
						rules={[{ required: true, message: 'Nhập lý do để hủy đơn hàng này!' }]}
					>
						<Input.TextArea />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Ok
						</Button>
						<Button onClick={handleCancel} style={{ marginLeft: 18 }}>
							Cancel
						</Button>
					</Form.Item>
				</Form>
			</Modal>
			<ModalDetail item={itemTransaction} setItem={setItemTransaction} />
		</div>
	);
}

DonHang.propTypes = {};

DonHang.defaultProps = {};

export default React.memo(DonHang);
