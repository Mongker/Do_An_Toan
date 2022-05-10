/* eslint-disable */
import React, { useState } from 'react';
import Chung from '../Header/Chung';
import style from './styles.module.css';
import { UnorderedListOutlined } from '@ant-design/icons';
import queryString from 'query-string';
import { Link, useHistory } from 'react-router-dom';
import { Card, Pagination } from 'antd';
import Footer from '../Footer/footer';
import useCategoryLogicData from '../../hooks/useCategoryLogicData';
import useProductLogicData from '../../hooks/useProductLogicData';
import { BASE_URL_IMAGE } from '../../util/TypeApi';
import Styles from '../Content/GoiYChoBan/styleGoiY.module.css';
import { ContextApp } from '../../context/contextApp';
// import PropTypes from 'prop-types';
const { Meta } = Card;
const pageSize = 20;

function WatchCatagory() {
	// hooks
	const { product } = useProductLogicData();

	const { category, getListCategory } = useCategoryLogicData();
	const categoryArr = Object.values(category);
	const categoryPaPa = categoryArr.filter((item) => item.paramId === '-1');
	const categoryPaPaSort = categoryPaPa.sort(function (a, b) {
		return a.index - b.index;
	});
	const history = useHistory();

	// context
	const { textSearch } = React.useContext(ContextApp);

	// ref
	const idOld = React.useRef();

	// state
	const [categoryId, setCategoryId] = useState('');
	const [current, setCurrent] = useState(1);
	const [minIndex, setMinIndex] = useState(0);
	const [maxIndex, setMaxIndex] = useState(pageSize);

	// const
	const parsed = queryString.parse(history.location.search);
	const id = parsed['_id'];
	const title =
		categoryId && category[categoryId] ? category[categoryId].name : 'Tất cả sản phẩm';
	const productFilter = () => {
		const priceString = (item) =>
			(item.price * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
		return Object.values(product).filter(
			(item) =>
				item.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
				priceString(item).toLowerCase().indexOf(`${textSearch}`.toLowerCase()) !== -1
		);
	};
	const arrProduct = categoryId
		? productFilter().filter((item) => item['catalog_id'] === categoryId)
		: productFilter();
	const totalPage = arrProduct.length / pageSize;
	// func handle
	const isActive = (_id) => {
		if (categoryId === _id) return '#b9c6f3';
		return '#ffffff';
	};
	const isActiveColor = (_id) => {
		if (categoryId === _id) return '#dddad6';
		return '#ffffff';
	};
	const onClickCategory = (id, event) => {
		setCurrent(1);
		setMinIndex(0);
		setMaxIndex(20);
		event && event.stopPropagation();
		if (`${idOld.current}` === `${id}`) {
			categoryId ? setCategoryId('') : setCategoryId(id);
		} else {
			setCategoryId(id);
			idOld.current = id;
		}
	};
	const handleChange = (page) => {
		setCurrent(page);
		setMinIndex((page - 1) * pageSize);
		setMaxIndex(page * pageSize);
	};

	// Vòng đời
	React.useEffect(() => {
		getListCategory();
	}, []);
	React.useEffect(() => {
		setCategoryId(id);
	}, [id]);
	return (
		<div>
			<Chung />
			<div className={style.wrap}>
				<div className={style.width_common}>
					<div className={style.title_danh_muc}>
						<div className={style.cate_home}>
							<UnorderedListOutlined style={{ margin: '0 15px' }} />
							Danh mục
						</div>
						<div className={style.label_page_header}>
							<h1 className={style.label_page_header_label}>{title}</h1>
							<hr className={style.hr_btn} />
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<div className={style.menu_item}>
							<ul>
								{categoryPaPaSort.map((item) => (
									<li
										style={{
											cursor: 'pointer',
											backgroundColor: isActiveColor(item._id),
										}}
										onClick={() => onClickCategory(item._id)}
									>
										<div style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</div>
										{categoryArr.filter((item_item) => item_item.paramId === item._id)
											.length > 0 && (
											<ul style={{ marginTop: 10 }}>
												{categoryArr
													.filter((item_item) => item_item.paramId === item._id)
													.map((item) => (
														<li
															className={style.menu_children_li}
															style={{
																cursor: 'pointer',
																backgroundColor: isActive(item._id),
															}}
															onClick={(event) => onClickCategory(item._id, event)}
														>
															{item.name}
														</li>
													))}
											</ul>
										)}
									</li>
								))}
							</ul>
						</div>
						<div className={style.content_product_detail}>
							<div className={style.page_row}>
								{arrProduct.map(
									(item, index) =>
										index >= minIndex &&
										index < maxIndex && (
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
																	style={{
																		color: '#ff6b00',
																		fontSize: 14,
																		fontWeight: 'bold',
																	}}
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
										)
								)}
							</div>
							<div className={style.pagination_content}>
								<Pagination
									size="small"
									pageSize={pageSize}
									current={current}
									total={arrProduct.length}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

WatchCatagory.propTypes = {};

WatchCatagory.defaultProps = {};

export default React.memo(WatchCatagory);
