/* eslint-disable */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Tabs, List, Button, Image, Modal, Input, message, Form } from 'antd';
import style from './style.module.scss';
import logo from '../../../../img/tong_tien.png';
import useTransactionData from '../../../../hooks/useTransactionData';
import useCartLogicData from '../../../../hooks/useCartLogicData';
import useProductLogicData from '../../../../hooks/useProductLogicData';
import ConvertStringToVND from '../../../../util/ConvertStringToVND';
import TYPE_TRANSACTION from '../../../../util/TypeDoDatHang';
import { BASE_URL_IMAGE } from '../../../../util/TypeApi';
import useCustomerLogicData from '../../../../hooks/useCustomerLogicData';
import { StopOutlined } from '@ant-design/icons';
import { ContextApp } from '../../../../context/contextApp';
import LoadingBase from '../../../../baseComponent/LoadingBase';

const ModalDetail = React.lazy(() =>
	import('../../../Account/DonHang/Modal/ModalDetail')
);

const { TabPane } = Tabs;
function DonDatHang() {
	const { transaction, putTransaction } = useTransactionData();
	const { carts } = useCartLogicData();
	const { product, updateProduct } = useProductLogicData();
	const { customer } = useCustomerLogicData();
	const { textSearch } = React.useContext(ContextApp);

	// state
	const [type, setType] = React.useState(TYPE_TRANSACTION.ALL);
	const [itemCancel, setItemCancel] = React.useState(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [itemTransactionDetail, setItemTransactionDetail] = useState(null);

	// handleFunction
	const [form] = Form.useForm();
	const _setItemTransactionDetail = (value = null) => {
		setItemTransactionDetail(value);
	};
	const handleImage = (cartId) => {
		return carts[cartId] &&
			carts[cartId].product_id &&
			product[carts[cartId].product_id] &&
			product[carts[cartId].product_id].image
			? BASE_URL_IMAGE + product[carts[cartId].product_id].image
			: 'https://blackmantkd.com/wp-content/uploads/2017/04/default-image.jpg';
	};
	const handleCancel = () => {
		setIsModalVisible(false);
		setItemCancel(null);
		form.resetFields();
	};

	const handleOk = (values) => {
		itemCancel['status_transaction'] = TYPE_TRANSACTION.DA_HUY;
		if (values.messageError.length <= 10) {
			message.warning('Lý do tối thiểu 10 ký tự!');
		} else {
			itemCancel['messageError'] = values.messageError;
			putTransaction(itemCancel, handleCancel);
			handleCancel();
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	const callback = (key) => {
		setType(key);
	};
	const updateStatus = (item) => {
		switch (item['status_transaction']) {
			case TYPE_TRANSACTION.CHO_XAC_NHAN:
				item['status_transaction'] = TYPE_TRANSACTION.CHO_LAY_HANG;
				break;
			case TYPE_TRANSACTION.CHO_LAY_HANG:
				item['status_transaction'] = TYPE_TRANSACTION.DANG_GIAO;
				break;
			case TYPE_TRANSACTION.DANG_GIAO:
				item['carts_id'].map(async (carts_id) => {
					const obj =
						carts[carts_id] &&
						carts[carts_id].product_id &&
						product[carts[carts_id].product_id];
					obj.sold = obj.sold + carts[carts_id].amount;
					await updateProduct(obj);
					return carts_id;
				});
				item['status_transaction'] = TYPE_TRANSACTION.DA_GIAO;
				break;
			case TYPE_TRANSACTION.DA_HUY:
				item['status_transaction'] = TYPE_TRANSACTION.CHO_XAC_NHAN;
				break;
			default:
				item['status_transaction'] = TYPE_TRANSACTION.CHO_XAC_NHAN;
				break;
		}
		putTransaction(item);
	};
	const handleHuyDon = (item) => {
		setItemCancel(item);
		setIsModalVisible(true);
	};

	const transactionFilter = () => {
		let arr = [...Object.values(transaction)];
		if (type !== 'Tất cả') {
			arr = Object.values(transaction).filter((item) => item.status_transaction === type);
		}

		const list = arr
			.filter((item) => {
				return item._id.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
			})
			.reverse();
		return list;
	};
	const handleDetailTransaction = (item = null) => {
		setItemTransactionDetail(item);
	};

	// JSX
	const ListComponent = (item) => (
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
					<div className={style.footer_list_left}>
						<div>
							Họ và tên :{' '}
							<span style={{ marginLeft: 30 }}>
								{item.user_id && customer[item.user_id] && customer[item.user_id].name}
							</span>
						</div>
						<div>
							Số điện thoại :{' '}
							<span style={{ marginLeft: 5 }}>
								{item.user_id && customer[item.user_id] && customer[item.user_id].phone}
							</span>
						</div>
					</div>
					<div className={style.footer_list_ringth}>
						<div className={style.footer_list_one}>
							<div className={style.footer_logo}>
								<img className={style.footer_logo_image} src={logo} alt={'logo'} />
							</div>
							<span className={style.footer_tong_tien}>Tổng số tiền : </span>
							<span className={style.footer_tien}>{ConvertStringToVND(item.amount)}</span>
						</div>
						<div className={style.footer_action}>
							{item['status_transaction'] !== TYPE_TRANSACTION.DA_GIAO &&
							item['status_transaction'] !== TYPE_TRANSACTION.DA_HUY ? (
								<>
									<div>
										<Button
											type="primary"
											disabled={type === TYPE_TRANSACTION.ALL}
											onClick={() => updateStatus(item)}
										>
											Xác nhận
										</Button>
									</div>
									<div style={{ marginLeft: 10 }}>
										<Button
											danger
											type="primary"
											disabled={type === TYPE_TRANSACTION.ALL}
											onClick={() => handleHuyDon(item)}
										>
											Hủy đơn
										</Button>
									</div>
								</>
							) : (
								<div />
							)}
							{/*{item['status_transaction'] === TYPE_TRANSACTION.DA_HUY && (*/}
							{/*	<div style={{ marginLeft: 10 }}>*/}
							{/*		<Button*/}
							{/*			type="primary"*/}
							{/*			disabled={type === TYPE_TRANSACTION.ALL}*/}
							{/*			onClick={() => updateStatus(item)}*/}
							{/*		>*/}
							{/*			Đặt lại*/}
							{/*		</Button>*/}
							{/*	</div>*/}
							{/*)}*/}
							<Button
								className={style.btn_action}
								onClick={() => handleDetailTransaction(item)}
							>
								Xem chi tiết đơn hàng
							</Button>
						</div>
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
									(product[carts[cartId].product_id].price -
										(
											(product[carts[cartId].product_id].price *
												product[carts[cartId].product_id].price_seo.split(' ')[0]) /
											100
										).toFixed(2)) *
										carts[cartId].amount
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
	);
	return (
		<div className={style.purchase_list_page__tabs_container}>
			<div className={style.card_container}>
				<Tabs type="card" className={style.tab_ant} onChange={callback}>
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
			<ModalDetail item={itemTransactionDetail} setItem={_setItemTransactionDetail} />
		</div>
	);
}

DonDatHang.propTypes = {};

DonDatHang.defaultProps = {};

export default React.memo(DonDatHang);
