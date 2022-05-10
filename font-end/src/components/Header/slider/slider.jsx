import React from 'react';
import { Carousel } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';
import classNames from 'classnames';
//style
import hot from '../../../img/hot.gif';
import { Link } from 'react-router-dom';
import Styles from './styleSlider.module.css';
import useCategoryLogicData from '../../../hooks/useCategoryLogicData';
import { BASE_URL_IMAGE } from '../../../util/TypeApi';
import useSliderLogicData from '../../../hooks/useSliderLogicData';
import khac from '../../../img/Book-icon.png';

const contentStyle = {
	width: '933px',
	height: '350px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
	objectFit: 'cover',
};
/* eslint-disable */

function Slider() {
	// hooks
	const { getListCategory, category } = useCategoryLogicData();
	const { getListSlider, slider } = useSliderLogicData();

	//state
	// const
	const listCategory = Object.values(category);
	const categoryPaPa = React.useCallback(
		(paramId = '-1') =>
			listCategory.filter((item) => item.paramId === paramId && item['status']),
		[listCategory]
	);
	const categoryPaPaSort = (paramId) =>
		categoryPaPa(paramId).sort((a, b) => a.index - b.index);

	// Vong dong
	React.useEffect(() => {
		getListCategory().then().catch();
		getListSlider().then().catch();
	}, []);

	// JSX
	const componentChildren = (rootId = '-1') => {
		const arr = categoryPaPaSort(rootId);
		const arrComponent = arr.slice(0, 6).map((item) => (
			<li key={item._id} className={Styles.menu_hover_row_item}>
				<Link to={`/xemtheomenu?_id=${item._id}`} className={Styles.menu_hover_link}>
					{item.name}
				</Link>
			</li>
		));
		arr.length > 6 &&
			arrComponent.push(
				<li className={Styles.menu_hover_row_item}>
					<Link to={`/xemtheomenu`} className={Styles.menu_hover_link}>
						<span style={{ color: 'red' }}>Xem tất cả >></span>
					</Link>
				</li>
			);
		return arrComponent;
	};
	return (
		<div className={Styles.slider_center}>
			{/*khong dong*/}
			<div className={Styles.menu_slider}>
				<ul className={Styles.hot_sale}>
					<div className={Styles.menu_danhmuc}>
						<li className={Styles.danhmuc}>
							<MenuFoldOutlined className={Styles.icon__category} />
							<h2>DANH MỤC</h2>
						</li>
					</div>
					<div className={Styles.menu_hotsale}>
						<div className={Styles.dososinh}>
							<li className={Styles.hot_sale_one}>
								<i>
									<img src={hot} />
								</i>
								<p>Top đầu tìm kiếm</p>
								<i>
									<img src={hot} />
								</i>
							</li>
						</div>
						<div className={Styles.suabot_ta_bim}>
							<li className={Styles.hot_sale_tow}>
								<div>
									<i>
										<img src={hot} />
									</i>
								</div>
								<div style={{ display: 'flex' }}>
									<p>Xếp hình</p>
									<p>- Xe</p>
									<p>- Máy súc [Có quà]</p>
								</div>
								<div>
									<i>
										<img src={hot} />
									</i>
								</div>
							</li>
						</div>
						<div className={Styles.khuyenmai_hangmoi}>
							<li className={Styles.hot_sale_fire}>
								<div>
									<i>
										<img src={hot} />
									</i>
								</div>
								<div style={{ display: 'flex' }}>
									<p>Khuyến mại</p>
									<p>- Hàng mới về</p>
								</div>
								<div>
									<i>
										<img src={hot} />
									</i>
								</div>
							</li>
						</div>
					</div>
				</ul>
			</div>
			{/*khong dong*/}
			<div className={Styles.slider}>
				<div className={Styles.left_slider}>
					<ul className={Styles.content_category_list}>
						{categoryPaPaSort()
							.slice(0, 6)
							.map((item) => (
								<li className={Styles.li_danh_muc} style={{ paddingTop: '6px' }}>
									<Link to={`/xemtheomenu?_id=${item._id}`}>
										<i
											style={{
												width: '33px',
												height: '33px',
												marginLeft: '10px',
												marginRight: '10px',
											}}
										>
											<img
												src={BASE_URL_IMAGE + item.icon}
												style={{ color: '#d219e7', fontSize: '20px' }}
											/>
										</i>
										{item.name}
										<div
											className={classNames(
												categoryPaPaSort(item._id).length > 0
													? Styles.menu_hover_six
													: Styles.menu_hover_six_none
											)}
										>
											<ul>
												<div
													className={Styles.menu_hover_row}
													style={{ borderRight: '1px solid #e0e0e0' }}
												>
													{componentChildren(item._id)}
												</div>
											</ul>
										</div>
									</Link>
								</li>
							))}
						<li style={{ paddingTop: '6px', fontFamily: 'Arial, Tahoma' }}>
							<i
								style={{
									width: '33px',
									height: '33px',
									marginLeft: '10px',
									marginRight: '10px',
								}}
							>
								<img src={khac} style={{ color: '#d219e7', fontSize: '20px' }} />
							</i>
							Thể loại khác
							<div className={Styles.menu_hover}>
								<ul>
									<div style={{ display: 'flex' }}>
										<div
											className={Styles.menu_hover_row}
											style={{ borderRight: '1px solid #e0e0e0' }}
										>
											{categoryPaPaSort()
												.slice(6, 13)
												.map((item) => (
													<li className={Styles.menu_hover_row_item}>
														<Link
															to={`/xemtheomenu?_id=${item._id}`}
															className={Styles.menu_hover_link}
														>
															{item.name}
														</Link>
													</li>
												))}
										</div>
										<div className={Styles.menu_hover_row}>
											{categoryPaPaSort()
												.slice(13, 19)
												.map((item) => (
													<li className={Styles.menu_hover_row_item}>
														<Link
															to={`/xemtheomenu?_id=${item._id}`}
															className={Styles.menu_hover_link}
														>
															{item.name}
														</Link>
													</li>
												))}
											{categoryPaPaSort().length > 19 && (
												<li className={Styles.menu_hover_row_item}>
													<Link to={`/xemtheomenu`} className={Styles.menu_hover_link}>
														<span style={{ color: 'red' }}>Xem tất cả >></span>
													</Link>
												</li>
											)}
										</div>
									</div>
								</ul>
							</div>
						</li>
					</ul>
				</div>
				<div className={Styles.center_slider}>
					<Carousel autoplay className={Styles.picture_slider}>
						{Object.values(slider)
							.sort((item1, item2) => item1.index - item2.index)
							.slice(0, 5)
							.map((item) => (
								<div>
									<h3 style={contentStyle}>
										<img
											style={{ width: '933px', height: '350px' }}
											src={BASE_URL_IMAGE + item.image_link}
											alt={item.name}
										/>
									</h3>
								</div>
							))}
					</Carousel>
				</div>
				{/*<div className={Styles.right_slider}>*/}
				{/*	<img*/}
				{/*		style={{ width: '100%', height: '175px' }}*/}
				{/*		src="https://media.shoptretho.com.vn/upload/image/banner/20210301/quet-vnpay-giam-15k-190-x-204.png"*/}
				{/*		alt="Quét VNPay giảm 15k"*/}
				{/*	/>*/}
				{/*	<img*/}
				{/*		style={{ width: '100%', height: '175px' }}*/}
				{/*		src="https://media.shoptretho.com.vn/upload/image/banner/20210301/chuc-mung-8-3-uu-dai-cho-me-qua-tang-cho-be-190-x-204-1.png"*/}
				{/*		alt="Chúc mừng 8/3 - Ưu đãi cho mẹ - Qùa tặng cho bé"*/}
				{/*	/>*/}
				{/*</div>*/}
			</div>
		</div>
	);
}

export default React.memo(Slider);
