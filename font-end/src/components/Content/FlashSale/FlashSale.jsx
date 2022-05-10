import React from 'react';
import { Button, Card, Statistic } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Styles from './Style.module.css';
import { Link } from 'react-router-dom';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';
const { Meta } = Card;
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 2 + 1000 * 30; // Moment is also OK

function FlashSale({ product }) {
	// state
	const [numberStart, setNumberStart] = React.useState(0);
	const [numberEnd, setNumberEnd] = React.useState(6);

	// const
	const arraySale = Object.values(product).filter((item) => item['price_seo'].length > 0);
	const newArraySale = arraySale.filter((item) => item['price_seo'] !== '0 %');
	// handle func
	const onFinish = () => {
		console.log('finished!');
	};
	const handleNext = () => {
		if (newArraySale.length !== numberEnd - 1) {
			setNumberStart(numberStart + 6);
			setNumberEnd(numberEnd + 6);
		}
	};
	const handleDown = () => {
		if (numberStart !== 0) {
			setNumberStart(numberStart - 6);
			setNumberEnd(numberEnd - 6);
		}
	};
	return (
		<div className={Styles.list_hot}>
			<div className={Styles.content_host}>
				<div className={Styles.header_hot}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							width: '30%',
							height: '100%',
						}}
					>
						<div className={Styles.sale} />
						<div className={Styles.time_sale}>
							<Countdown
								value={deadline}
								onFinish={onFinish}
								valueStyle={{ color: '#ffffff', fontSize: '18px' }}
							/>
						</div>
					</div>
					<div className={Styles.xem_tat_ca}>
						<Link to="/flashsale">
							<Button type="text" className={Styles.btn_xem}>
								Xem tất cả >
							</Button>
						</Link>
					</div>
				</div>
				<div className={Styles.content_host_item}>
					{!!numberStart && (
						<Button
							onClick={handleDown}
							className={Styles.btn_giam}
							type="primary"
							shape="circle"
							icon={<LeftOutlined />}
						/>
					)}
					<div
						style={{
							width: '95%',
							height: '98%',
							display: 'flex',
							justifyContent: 'space-around',
							position: 'relative',
						}}
					>
						{newArraySale.slice(numberStart, numberEnd).map((item) => {
							return (
								<Link to={`/detail/${item._id}`}>
									<Card
										hoverable
										className={Styles.card_item}
										cover={
											<img
												alt={item.image}
												src={BASE_URL_IMAGE + item.image}
												style={{ width: 150, height: 150 }}
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
															(
																item.price -
																(item.price * item.price_seo.split(' ')[0]) / 100
															).toFixed(2) * 1000
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
								</Link>
							);
						})}
					</div>
					{newArraySale.length !== numberEnd && (
						<Button
							type="primary"
							shape="circle"
							onClick={handleNext}
							className={Styles.btn_tang}
							icon={<RightOutlined />}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

FlashSale.propTypes = {
	product: PropTypes.object,
};

FlashSale.defaultProps = {
	product: {},
};

export default React.memo(FlashSale);
