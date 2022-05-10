import React from 'react';
import Chung from '../../Header/Chung';
// import PropTypes from 'prop-types';
import style from './styleGoiY.module.css';
import { Card, Pagination } from 'antd';
import Footer from '../../Footer/footer';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';
import Styles from './styleGoiY.module.css';
const { Meta } = Card;
function TatCaSP() {
	const product = useSelector((state) => state['product']);
	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div>
			<Chung />
			<div className={style.page_recommend_container}>
				<div className={style.label_page_header}>
					<h1 className={style.label_page_header_label}>Tất cả</h1>
					<hr className={style.label_page_header_dotted_line} />
				</div>
				<div className={style.page_row}>
					{Object.values(product)
						.concat(Object.values(product))
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
														.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'}
												</div>
											}
										/>
									</Card>
								)}
							</Link>
						))}
				</div>
				{/*<div className={style.content_page}>*/}
				{/*	<Pagination defaultCurrent={6} total={500} />*/}
				{/*</div>*/}
			</div>
			<Footer />
		</div>
	);
}

TatCaSP.propTypes = {};

TatCaSP.defaultProps = {};

export default React.memo(TatCaSP);
