/* eslint-disable */
import React from 'react';
import { Avatar, Button, Modal, Popconfirm, Table } from 'antd';
import Styles from '../style.module.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';

const columnXemTatCa = [
	{
		title: 'STT',
		dataIndex: 'stt',
		width: '80px',
	},
	{
		title: 'Tên sản phẩm',
		dataIndex: 'name',
		width: '450px',
	},
	{
		title: 'Giá 1 sản phẩm',
		dataIndex: 'price',
		width: '100px',
	},
	{
		title: 'Số lượng',
		dataIndex: 'number',
		width: '100px',
	},
	{
		title: 'Tổng tiền',
		dataIndex: 'total',
		width: '100px',
	},
];

function PopupBuyProduct(props) {
	const { setModal2Visible, product, selectedRowKeys, carts } = props;

	const handleHuy = () => {
		setModal2Visible(false);
	};
	const sumMoney = () => {
		let sum = 0;
		selectedRowKeys.map((id) => {
			sum =
				(product &&
					product[carts[id].product_id] &&
					product[carts[id].product_id].price * 1000) + sum;
		});
		return sum;
	};

	const data = selectedRowKeys.map((id, index) => ({
		key: id,
		stt: index + 1,
		name: (
			<div style={{ display: 'flex', width: '500px' }}>
				<Avatar
					src={
						product &&
						product[carts[id].product_id] &&
						BASE_URL_IMAGE + product[carts[id].product_id].image
					}
					style={{ width: '50px', height: '50px' }}
				/>
				<div style={{ marginLeft: '15px' }}>
					{product && product[carts[id].product_id] && product[carts[id].product_id].name}
				</div>
			</div>
		),
		price: (
			<div className={Styles.gia_item_cart}>
				<span>
					{`${
						product &&
						product[carts[id].product_id] &&
						product[carts[id].product_id].price * 1000
					}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'}
				</span>
			</div>
		),
		number: carts[id].amount,
		total: (
			<span style={{ color: 'red' }}>
				{`${
					product &&
					product[carts[id].product_id] &&
					product[carts[id].product_id].price * 1000 * carts[id].amount
				}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'}
			</span>
		),
	}));
	return (
		<div>
			<Table
				columns={columnXemTatCa}
				dataSource={data}
				pagination={false}
				scroll={{ y: 240 }}
			/>
			<div style={{ marginTop: '50px', display: 'flex' }}>
				<div style={{ marginLeft: '320px' }}>
					<b>Số sản phẩm đã chọn :</b>{' '}
					<span style={{ color: 'red', fontSize: '18px' }}>{selectedRowKeys.length}</span>
					<span> sản phẩm</span>
				</div>
				<div style={{ marginLeft: '100px' }}>
					<b>Tổng số tiền :</b>{' '}
					<span style={{ color: 'red', fontSize: '18px' }}>
						{sumMoney()
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
					</span>
					<span> nghìn đồng</span>
				</div>
			</div>
			<div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
				<Button
					style={{
						width: '100px',
						backgroundColor: '#f05d40',
						color: '#fff',
						boxShadow: '2px 5px 8px red',
						border: '1px solid',
						borderRadius: '25px',
						marginRight: '40px',
					}}
					onClick={handleHuy}
				>
					Hủy
				</Button>
				<Link to={'/buyproduct'}>
					<Button
						style={{
							width: '100px',
							backgroundColor: '#f05d40',
							color: '#fff',
							boxShadow: '2px 5px 8px red',
							border: '1px solid',
							borderRadius: '25px',
						}}
					>
						Đặt mua
					</Button>
				</Link>
			</div>
		</div>
	);
}

PopupBuyProduct.propTypes = {
	selectedRowKeys: PropTypes.array,
	product: PropTypes.object,
};

PopupBuyProduct.defaultProps = {
	selectedRowKeys: [],
	product: {},
};

export default React.memo(PopupBuyProduct);
