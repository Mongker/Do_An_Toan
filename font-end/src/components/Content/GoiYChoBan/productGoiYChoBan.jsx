/* eslint-disable */
import React from 'react';
import { Button, Card, Pagination } from 'antd';
import PropTypes from 'prop-types';

//style
import Styles from './styleGoiY.module.css';
import { Link } from 'react-router-dom';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';
const { Meta } = Card;

ProductListGoiYChoBan.propTypes = {};

function ProductListGoiYChoBan({ product, isSearch }) {
	return (
		<div className={Styles.list_hot}>
			<div className={Styles.content_host}>
				<div className={Styles.header_goi_y}>
					<div
						style={{
							width: '30%',
							height: '100%',
							display: 'flex',
							justifyContent: 'space-around',
							marginTop: '15px',
						}}
					>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<div>
								<h1>{isSearch ? 'Kết quả tìm kiếm' : 'GỢI Ý HÔM NAY'}</h1>
							</div>
							<div
								style={{
									width: '100%',
									height: '7px',
									zIndex: 1,
									backgroundColor: 'rgb(238, 77, 45)',
								}}
							/>
						</div>
						<div>
							<img
								src="https://cf.shopee.vn/file/3eee015cc8c039be3ebe8bb7b621ecf3"
								style={{ width: 'auto', height: '1.25rem' }}
							/>
						</div>
					</div>
				</div>
				<hr
					style={{
						height: '2px',
						borderWidth: '0',
						color: '#5deccf',
						backgroundColor: '#efdada',
					}}
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						height: '97.5%',
						alignItems: 'center',
					}}
				>
					<div className={Styles.content_host_item_goi_y}>
						{Object.values(product)
							.slice(0, 45)
							.map((item) => (
								<Link to={`/detail/${item._id}`}>
									{item['price_seo'] !== '0 %' ? (
										<Card
											hoverable
											className={Styles.card_item_goi_y}
											cover={
												<img
													alt={item.image}
													src={BASE_URL_IMAGE + item.image}
													style={{ width: 178, height: 150 }}
												/>
											}
										>
											<Meta
												title={item.name}
												description={
													<div
														style={{
															color: '#ff6b00',
															fontSize: 14,
															fontWeight: 'bold',
														}}
													>
														<div>
															{(
																(item.price -
																	(item.price * item.price_seo.split(' ')[0]) / 100) *
																1000
															)
																.toString()
																.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
														</div>
														<span className={Styles.old_price}>
															{(item.price * 1000)
																.toString()
																.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
														</span>
													</div>
												}
											/>
											<div className={Styles._2TDZGE}>
												<div className={Styles.percent}>{item['price_seo']}</div>
												<div className={Styles._17XqBU}>giảm</div>
											</div>
										</Card>
									) : (
										<Card
											hoverable
											className={Styles.card_item_goi_y}
											cover={
												<img
													alt="Đồ chơi ô tô thả hình số đếm XE30a"
													src={BASE_URL_IMAGE + item.image}
													style={{ width: 178, height: 150 }}
												/>
											}
										>
											<Meta
												title={item.name}
												description={
													<div
														style={{ color: '#ff6b00', fontSize: 14, fontWeight: 'bold' }}
													>
														{(item.price * 1000)
															.toString()
															.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
													</div>
												}
											/>
										</Card>
									)}
								</Link>
							))}
					</div>
				</div>
				<div className={Styles.xem_them}>
					<Link to={'/tatca'}>
						<Button type="primary" block className={Styles.btn_xem_them}>
							Xem thêm
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

ProductListGoiYChoBan.propTypes = {
	product: PropTypes.object,
	isSearch: PropTypes.bool,
};

ProductListGoiYChoBan.defaultProps = {
	product: {},
};

export default React.memo(ProductListGoiYChoBan);
