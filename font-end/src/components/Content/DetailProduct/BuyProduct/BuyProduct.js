/* eslint-disable */
import React, { useContext, useState } from 'react';
import { InputNumber, Table } from 'antd';
// import PropTypes from 'prop-types';
import Styles from './style.module.scss';
import logo from '../../../../img/logo-gcb.jpg';
import { Form, Input, Button, Radio, Modal } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useProductLogicData from '../../../../hooks/useProductLogicData';
import useCartLogicData from '../../../../hooks/useCartLogicData';
import { useSelector } from 'react-redux';
import { ContextApp } from '../../../../context/contextApp';
import ConvertStringToVND from '../../../../util/ConvertStringToVND';
import useTransactionData from '../../../../hooks/useTransactionData';
import { BASE_URL_IMAGE } from '../../../../util/TypeApi';

const { TextArea } = Input;

const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const radioStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px',
};
const columns = [
	{
		title: 'Ảnh',
		dataIndex: 'image',
		key: 'image',
		fixed: 'left',
		width: 80,
	},
	{
		title: 'Tên',
		dataIndex: 'name',
		key: '1',
		width: 250,
	},
	{
		title: 'Số lượng',
		dataIndex: 'amount',
		key: '2',
		width: 200,
	},
	{
		title: 'Tổng tiền',
		dataIndex: 'price',
		key: '3',
		width: 150,
	},
	{
		title: 'Action',
		key: 'operation',
		fixed: 'right',
		dataIndex: 'action',
		width: 80,
	},
];

const data = [];
const styleInput = { width: '380px' };

function BuyProduct() {
	// hooks
	const { product, getListProduct } = useProductLogicData();
	const { carts, getListCart, updateCart } = useCartLogicData();
	const { postTransaction } = useTransactionData();
	const history = useHistory();
	const [form] = Form.useForm();
	const myUser = useSelector((state) => state['myUser']);
	const { selectedRowKeys, setSelectedRowKeys } = useContext(ContextApp);
	// state
	const [modal2Visible, setModal2Visible] = React.useState(false);
	const [dataTable, setDataTable] = React.useState([]);

	React.useEffect(() => {
		if (selectedRowKeys.length === 0) {
			history.push('/cart');
		}
	}, []);

	// handle func
	const handleChangeAmount = (value, data) => {
		updateCart({
			_id: data._id,
			amount: value,
		});
	};
	const callBack = () => {
		history.push('/account?show=2');
	};

	const onFinish = (values) => {
		values['user_id'] = myUser._id;
		values['carts_id'] = selectedRowKeys;
		values['amount'] = handleSumMoney(true);
		values['message'] = values['message'] ? values['message'] : '';
		postTransaction(values, callBack);
	};
	const onFinishFailed = (errorInfo) => {
		// console.log('Failed:', errorInfo);
	};
	const setModalVisible = (modal2Visible) => {
		setModal2Visible(modal2Visible);
	};
	const handleSumMoney = (typeNumber = false) => {
		let sumMoney = 0;
		selectedRowKeys.length > 0 &&
			selectedRowKeys.map(
				(item) =>
					(sumMoney =
						sumMoney +
						(
							product[carts[item].product_id].price -
							(product[carts[item].product_id].price *
								product[carts[item].product_id].price_seo.split(' ')[0]) /
								100
						).toFixed(2) *
							carts[item].amount)
			);
		sumMoney < 200 && (sumMoney = sumMoney + 35);
		if (typeNumber) return sumMoney;
		return ConvertStringToVND(sumMoney.toFixed(2));
	};
	const handleDeleteCart = (idDelete) => {
		const result = selectedRowKeys.filter((id) => id !== idDelete);
		setSelectedRowKeys(result);
	};
	const handleImage = (cartId) => {
		return carts[cartId] && carts[cartId].product_id
			? BASE_URL_IMAGE + product[carts[cartId].product_id].image
			: 'https://blackmantkd.com/wp-content/uploads/2017/04/default-image.jpg';
	};

	// Vòng đời
	React.useEffect(() => {
		getListCart();
		getListProduct();
		return () => {
			setSelectedRowKeys([]);
		};
	}, []);
	React.useEffect(() => {
		form.setFieldsValue({ ...myUser });
	}, [myUser]);

	React.useEffect(() => {
		if (
			Object.keys(carts).length > 0 &&
			Object.keys(product).length > 0 &&
			selectedRowKeys.length
		) {
			const arrTable = selectedRowKeys.map((idCart) => ({
				key: idCart,
				image: (
					<img
						src={handleImage(idCart)}
						style={{ width: '50px', height: '50px', objectFit: 'cover' }}
					/>
				),
				name: <div>{product[carts[idCart].product_id].name}</div>,
				amount: (
					<InputNumber
						min={1}
						max={100}
						// value={carts[idCart].amount}
						defaultValue={carts[idCart].amount}
						onChange={(value) => handleChangeAmount(value, carts[idCart])}
					/>
				),
				price: (
					<div>
						{carts[idCart].amount &&
							product[carts[idCart].product_id] &&
							(
								(
									product[carts[idCart].product_id].price -
									(product[carts[idCart].product_id].price *
										product[carts[idCart].product_id].price_seo.split(' ')[0]) /
										100
								).toFixed(2) *
								1000 *
								carts[idCart].amount
							)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'}
					</div>
				),
				action: <Button onClick={() => handleDeleteCart(idCart)}>Xóa</Button>,
			}));
			setDataTable(arrTable);
		}
	}, [carts, product, selectedRowKeys]);
	return (
		<div className={Styles.wrap_oder}>
			<div className={Styles.header_oder}>
				<div className={Styles.header_oder_1}>
					<div className={Styles.logo_oder}>
						<Button
							type="text"
							className={Styles.btn_logo}
							onClick={() => setModalVisible(true)}
						>
							<img src={logo} style={{ width: '55%', height: '100%' }} />
						</Button>
						<Modal centered visible={modal2Visible} footer={null} closable={false}>
							<span style={{ color: '#6dc6bf', marginLeft: '110px', fontSize: '18px' }}>
								<ExclamationCircleOutlined
									style={{ color: 'green', marginRight: '10px' }}
								/>{' '}
								<b>Bạn muốn trở về trang chủ</b>
							</span>
							<div
								style={{
									width: '300px',
									marginTop: '20px',
									display: 'flex',
									justifyContent: 'space-around',
									marginLeft: '95px',
								}}
							>
								<Link to={'/'}>
									<Button
										style={{
											backgroundColor: '#f9f9f9',
											boxShadow:
												'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
										}}
									>
										Về trang chủ
									</Button>
								</Link>
								<Button
									style={{
										backgroundColor: '#ff6723',
										color: '#fff',
										boxShadow:
											'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
									}}
									onClick={() => setModalVisible(false)}
								>
									<b>Không, tôi ở lại</b>
								</Button>
							</div>
						</Modal>
						{/*<Link to={'/'}>*/}
						{/*	<img src={logo} />*/}
						{/*</Link>*/}
					</div>
					<div className={Styles.oder_header_icon}>
						<div className={Styles.box_icon_item_1}>
							<span className={Styles.box_icon_ic_icon_ship} />
							<span className={Styles.giao_hang}>Giao hàng toàn quốc</span>
						</div>
						<div className={Styles.box_icon_item_2}>
							<span className={Styles.box_icon_bg_icon_ship} />
							<span className={Styles.giao_hang}>Đổi hàng 15 ngày miễn phí</span>
						</div>
						<div className={Styles.box_icon_item_3}>
							<span className={Styles.box_icon_chinhhang} />
							<span className={Styles.giao_hang}>Đảm bảo hàng chính hãng</span>
						</div>
					</div>
				</div>
				<div className={Styles.login_oder}>
					<span>Hãy </span>
					<Link to={'/account'}>
						<b>Cập nhật thông tin tài khoản của bạn</b>
					</Link>
					<span> để mua hàng nhanh hơn! </span>
					<span style={{ float: 'right', margin: '0 5px 0 5px' }}>
						<Link to={'/cart'}>
							<i>Tiếp tục mua hàng >> </i>
						</Link>
					</span>
				</div>
			</div>
			<div className={Styles.main_order}>
				<div className={Styles.cart_error}>
					<span style={{ color: 'green' }}>
						{/*Để đảm bảo quyền lợi của khách hàng. Kể từ ngày 26/08/2018 Childrem Toy đã nâng cấp hệ thống để kiểm tra mỗi số ĐT tích điểm chỉ được sử dụng cho 1 tài khoản mua hàng duy nhất. Và Quý khách có thể dùng số ĐT để đăng nhập thay cho Email.<br/>Chân thành cảm ơn sự đồng hành của Quý khách hàng*/}
					</span>
				</div>
				<Form
					{...layout}
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					className={Styles.form_thanh_toan}
					form={form}
				>
					<div style={{ display: 'flex' }}>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div className={Styles.left_order}>
								<div className={Styles.thong_tin}>
									<span className={Styles.tieu_de}>Thông tin mua hàng</span>
									<Form.Item
										name="name"
										rules={[{ required: true, message: 'Please input your username!' }]}
									>
										<Input placeholder="Username" style={styleInput} disabled />
									</Form.Item>
									<Form.Item>
										<div style={{ display: 'flex', width: '380px' }}>
											<span className={Styles.gt}>Giới tính : </span>
											<Radio.Group
												name={'gender'}
												style={{ marginLeft: '10px', display: 'flex' }}
												disabled
											>
												<Radio style={radioStyle} value={'1'}>
													Nam
												</Radio>
												<Radio style={radioStyle} value={'2'}>
													Nữ
												</Radio>
												<Radio style={radioStyle} value={'3'}>
													Khác
												</Radio>
											</Radio.Group>
										</div>
									</Form.Item>
									<Form.Item
										name="phone"
										rules={[
											{ required: true, message: 'Please input your phone number!' },
										]}
									>
										<Input
											style={{ width: '100%', ...styleInput }}
											placeholder="Số điện thoại giao hàng"
										/>
									</Form.Item>
									<Form.Item
										name="email"
										rules={[
											{
												type: 'email',
												message: 'The input is not valid E-mail!',
											},
											{
												required: true,
												message: 'Please input your E-mail!',
											},
										]}
									>
										<Input placeholder="Email" style={styleInput} disabled />
									</Form.Item>
									<div className={Styles.textarea_diachi}>
										<Form.Item
											name="address"
											rules={[{ required: true, message: 'Không được bỏ trống địa chỉ' }]}
										>
											<TextArea
												placeholder="Số nhà, tòa nhà, đường, xã phường"
												rows={3}
											/>
										</Form.Item>
									</div>
								</div>
								<div className={Styles.thanh_toan}>
									<span className={Styles.tieu_de}>Thời gian nhận hàng</span>
									<Form.Item
										name={'delivery_time'}
										rules={[{ required: true, message: 'Không được trống trường này' }]}
									>
										<Radio.Group style={{ marginLeft: '10px' }}>
											<Radio style={radioStyle} value={'Trong giờ hành chính'}>
												Trong giờ hành chính
											</Radio>
											<Radio style={radioStyle} value={'Ngoài giờ hành chính'}>
												Ngoài giờ hành chính
											</Radio>
										</Radio.Group>
									</Form.Item>
									<div className={Styles.tieu_de} style={{ marginTop: '0px' }}>
										Hình thức thanh toán
									</div>
									<Form.Item
										name={'payment'}
										rules={[{ required: true, message: 'Không được trống trường này' }]}
									>
										<Radio.Group style={{ marginLeft: '10px' }}>
											<Radio style={radioStyle} value={'Thanh toán khi nhận hàng(COD)'}>
												Thanh toán khi nhận hàng(COD)
											</Radio>
											<Radio
												style={radioStyle}
												value={'Chuyển khoản qua ngân hàng'}
												disabled
											>
												Chuyển khoản qua ngân hàng
											</Radio>
										</Radio.Group>
									</Form.Item>
									<div className={Styles.textarea_message}>
										<Form.Item name={'message'}>
											<TextArea
												rows={3}
												placeholder="Viết ghi chú, yêu cầu đối với đơn hàng cho người giao hàng."
											/>
										</Form.Item>
									</div>
								</div>
							</div>
							<div style={{ marginLeft: '20px', width: '380px', display: 'flex' }}>
								<span className={Styles.tieu_de} style={{ marginTop: '0px' }}>
									Đơn hàng
									<span className={Styles.so_luong}> {selectedRowKeys.length}</span>
								</span>
							</div>
							<div className={Styles.table_product}>
								<Form.Item>
									<Table
										columns={columns}
										dataSource={dataTable}
										scroll={{ x: 800, y: 200 }}
										pagination={false}
									/>
								</Form.Item>
							</div>
						</div>
						<div className={Styles.right_order}>
							<div style={{ marginLeft: '20px', width: '330px', display: 'flex' }}>
								<span className={Styles.tieu_de}>Tổng tiền đơn hàng</span>
							</div>
							<div className={Styles.line_order}>
								<span className={Styles.total_text}>Phí vận chuyển :</span>
								<Form.Item>
									<span className={Styles.total_money_oder}>
										{handleSumMoney(true) < 200 ? '35.000' : '0'} VNĐ
									</span>
								</Form.Item>
							</div>
							<div className={Styles.line_order}>
								<span className={Styles.total_text}>Thành tiền :</span>
								<Form.Item>
									<span className={Styles.total_money}>{handleSumMoney()}</span>
								</Form.Item>
							</div>
							<div className={Styles.btn_finish}>
								<Form.Item>
									<Button className={Styles.xong} htmlType="submit">
										ĐẶT HÀNG
									</Button>
								</Form.Item>
							</div>
						</div>
					</div>
				</Form>
			</div>
			<div className={Styles.footer_order}>
				<div className={Styles.line_bottom}>
					Bạn cần hỗ trợ? Gọi hotline <b>1800 6066</b>
				</div>
				<div className={Styles.popup_home}>
					<div>
						<a>FAQ</a>
						<span>|</span>
						<a>Chính sách thanh toán</a>
						<span>|</span>
						<a>Điều khoản sử dụng</a>
						<br />
					</div>
					<div>
						<span>© 2021 childrenToy.com.vn - Thiên đường cho bé!</span>
					</div>
				</div>
			</div>
		</div>
	);
}

BuyProduct.propTypes = {};

BuyProduct.defaultProps = {};

export default React.memo(BuyProduct);
