import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
//style
import Styles from './styleHost.module.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Slider from './SliderNoiBat/Slider';
import { Link } from 'react-router-dom';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';
import { useSelector } from 'react-redux';
const { Meta } = Card;
ProductListHot.propTypes = {};

function ProductListHot(props) {
	const product = useSelector((state) => state['product']);
	const [newRandom, setNewRandom] = React.useState([]);
	const newArrValue = Object.values(product);
	useEffect(() => {
		if (newArrValue.length > 0) {
			for (let i = 0; i < 8; i++) {
				const item = newArrValue[Math.floor(Math.random() * newArrValue.length)];
				newRandom.length < 8 && newRandom.push(item);
				setNewRandom([...newRandom]);
			}
		}
	}, [product]);
	return (
		<div className={Styles.list_hot}>
			<div className={Styles.content_noi_bat}>
				<div className={Styles.header_noi_bat}>
					<div className={Styles.title_noi_bat}>SẢN PHẨM NỔI BẬT</div>
					<div className={Styles._2Kl5gH}>
						<div className={Styles.sQprQi}>
							<div className={Styles._2SCKPT_5} />7 ngày miễn phí trả hàng
						</div>
						<div className={Styles.sQprQi}>
							<div className={Styles._2SCKPT_6} />
							Hàng chính hãng 100%
						</div>
						<div className={Styles.sQprQi}>
							<div className={Styles._2SCKPT_7} />
							Miễn phí vận chuyển
						</div>
					</div>
					{/*<div className={Styles.xem_tat_ca_noi_bat}>*/}
					{/*	<Link to="/allnoibat">*/}
					{/*		<Button type="text" className={Styles.btn_xem}>*/}
					{/*			Xem tất cả >*/}
					{/*		</Button>*/}
					{/*	</Link>*/}
					{/*</div>*/}
				</div>
				<hr
					style={{
						height: '2px',
						borderWidth: '0',
						color: '#5deccf',
						backgroundColor: '#efdada',
					}}
				/>
				<div className={Styles.elemtent_noibat}>
					<div className={Styles.slideshow_container}>
						<Slider />
					</div>
					<div className={Styles.item_cart_content}>
						{/*<Button*/}
						{/*	className={Styles.btn_giam_noi_bat}*/}
						{/*	type="primary"*/}
						{/*	shape="circle"*/}
						{/*	icon={<LeftOutlined />}*/}
						{/*/>*/}
						<div className={Styles.item_cart_content_i}>
							{newRandom.map((item) => {
								return (
									<Link to={`/detail/${item._id}`}>
										{
											<Card
												hoverable
												className={Styles.card_noi_bat}
												cover={<img alt={item.image} src={BASE_URL_IMAGE + item.image} />}
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
															<span className={Styles.old_price}>
																{(item.price * 1000)
																	.toString()
																	.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
															</span>
														</div>
													}
												/>
											</Card>
										}
									</Link>
								);
							})}
						</div>
					</div>
					{/*<Button*/}
					{/*	type="primary"*/}
					{/*	shape="circle"*/}
					{/*	className={Styles.btn_tang_noi_bat}*/}
					{/*	icon={<RightOutlined />}*/}
					{/*/>*/}
				</div>
			</div>
		</div>
	);
}

export default React.memo(ProductListHot);
