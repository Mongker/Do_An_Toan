import React from 'react';
import Chung from '../../../Header/Chung';
import style from '../Style.module.css';
import Countdown from 'antd/es/statistic/Countdown';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import Styles from '../Style.module.css';
import { useSelector } from 'react-redux';
import Footer from '../../../Footer/footer';
import { BASE_URL_IMAGE } from '../../../../util/TypeApi';
const { Meta } = Card;
// import PropTypes from 'prop-types';
const deadline = Date.now() + 1000 * 60 * 60 * 2 + 1000 * 30; // Moment is also OK
function AllFlashSale() {
	const product = useSelector((state) => state['product']);
	// state
	// const
	const arraySale = Object.values(product).filter((item) => item['price_seo'].length > 0);
	const newArraySale = arraySale.filter((item) => item['price_seo'] !== '0 %');
	const onFinish = () => {
		console.log('finished!');
	};
	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			<Chung />
			<div className={style.content_flash_sale}>
				<div className={style.title_content_flash_sale}>
					<div className={style.title_content_flash_sale_item}>
						<div className={style.item_content} />
						<div className={style.item_content_ketthuc}>Kết thúc trong</div>
						<div>
							<Countdown value={deadline} onFinish={onFinish} />
						</div>
					</div>
				</div>
				<div className={style.values_content_flash_sale}>
					{newArraySale.map((item) => (
						<Link to={`/detail/${item._id}`}>
							<Card
								hoverable
								className={Styles.card_item_all_flash}
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
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}

AllFlashSale.propTypes = {};

AllFlashSale.defaultProps = {};

export default React.memo(AllFlashSale);
