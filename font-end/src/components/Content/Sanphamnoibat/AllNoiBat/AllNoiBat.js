import React from 'react';
import Chung from '../../../Header/Chung';
import style from '../styleHost.module.css';
import { Card } from 'antd';
import Styles from '../../FlashSale/Style.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../../../Footer/footer';
// import PropTypes from 'prop-types';
const { Meta } = Card;
function AllNoiBat() {
	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	const product = useSelector((state) => state['product']);
	// const
	const arraySale = Object.values(product);
	return (
		<div>
			<Chung />
			<div className={style.content_all_noi_bat}>
				<div className={style.label_page_header}>
					<h1 className={style.label_page_header_label}>Tất cả Sản phẩm nổi bật</h1>
					<hr className={style.label_page_header_dotted_line} />
				</div>
				<div className={style.values_content_all_noi_bat}>
					{arraySale.map((item) => (
						<Link to={`/detail/${item._id}`}>
							<Card
								hoverable
								className={style.card_item_all_noi_bat}
								cover={
									<img
										alt="Bảng số có núm gỗ - BA101"
										src="https://media.shoptretho.com.vn/upload/image/product/20170524/bang-so-co-num-ba101-1.jpg?mode=max&width=400&height=400"
									/>
								}
							>
								<Meta
									title={item.name}
									description={
										<div style={{ color: '#ff6b00', fontSize: 14, fontWeight: 'bold' }}>
											{(item.price * 1000)
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'}
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

AllNoiBat.propTypes = {};

AllNoiBat.defaultProps = {};

export default React.memo(AllNoiBat);
