/* eslint-disable */
import React, { useContext, useState } from 'react';
import '../../Header/advertisement/style.scss';
import '../../Header/menuHeader/style.module.css';
import Styles from './Style.module.scss';
import { Button, Card, Rate, Pagination, message, Empty, InputNumber } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import CommentProduct from './Comment/Comment';
import Footer from '../../Footer/footer';
import Chung from '../../Header/Chung';
import { useDispatch, useSelector } from 'react-redux';
import baseAPI from '../../../axios/baseAPI';
import { BASE_URL_IMAGE, TYPE_STORE, TypeApi } from '../../../util/TypeApi';
import { TYPE_ACTION } from '../../../actions/TypeAction';
import ReactImageMagnify from 'react-image-magnify';
import { ContextApp } from '../../../context/contextApp';
import CommentsContainer from '../../../baseComponent/comments/CommentsContainer';
import useCommentsLogic from '../../../hooks/useCommentsLogic';
const { Meta } = Card;
const key = 'updatable';
// import PropTypes from 'prop-types';
const pageSize = 8;

function DetailProduct() {
	const [getList] = useCommentsLogic();
	// hooks
	const { id } = useParams();
	const product = useSelector((state) => state['product']);
	const myUser = useSelector((state) => state['myUser']);
	const carts = useSelector((state) => state['carts']);
	const history = useHistory();
	const dispatch = useDispatch();
	const { setSelectedRowKeys } = useContext(ContextApp);

	// filter
	const arrayProduct = Object.values(product).filter((item) => item._id === id);
	const listComments = useSelector((state) => state[TYPE_STORE.comment]);
	const comments = Object.values(listComments);
	// state
	const [objDetail, setObjDetail] = React.useState({});
	const [productSuggest, setProductSuggest] = React.useState([]);
	const [imageActive, setImageActive] = React.useState('');
	const [amount, setAmount] = React.useState(1);
	const [current, setCurrent] = useState(1);
	const [minIndex, setMinIndex] = useState(0);
	const [maxIndex, setMaxIndex] = useState(pageSize);

	let numberVote = 0;
	comments.map((item) => (numberVote += item.vote));
	const valueCommentTB =
		numberVote / comments.filter((value) => value.id_comment === '-1').length;

	const handleBuyProduct = async () => {
		const idCart = await handleAddCart(false);
		await setSelectedRowKeys([idCart]);
		(await myUser.email)
			? history.push(`/buyproduct`)
			: message.warn('Bạn cần đăng nhập để thực hiện chức năng này');
	};
	const handleAddCart = async (isMessage = true) => {
		const dataCart = {
			product_id: id,
			status: false,
			user_id: myUser._id,
			amount: amount,
		};
		const { message: messageAPI, cart } = await baseAPI.add(TypeApi.cart, dataCart);
		if (messageAPI === 'SUCCESS') {
			carts[cart._id] = cart;
			await dispatch({
				type: TYPE_ACTION.CART.ADD_CART,
				payload: { data: { ...carts } },
			});
			isMessage &&
				message.loading({
					className: 'message_success',
					content: 'Đang thêm vào giỏ của bạn!',
					key,
				});
			isMessage &&
				setTimeout(() => {
					message.success({
						className: 'message_success',
						content: 'Thêm vào giỏ hàng thành công!',
						key,
						duration: 2,
					});
				}, 1000);
		} else {
			isMessage && message.warn(messageAPI);
		}
		return cart && cart._id && cart._id;
	};

	const getProduct = async (objParams, handleFunc, type) => {
		const data = await baseAPI.getAll(TypeApi.product, objParams);
		const arr = Object.values(data);
		arr.length > 0 && type === 'getId' ? handleFunc(arr[0]) : handleFunc(arr);
	};
	const handleChange = (page) => {
		setCurrent(page);
		setMinIndex((page - 1) * pageSize);
		setMaxIndex(page * pageSize);
	};

	const onChangeNumber = (value) => {
		setAmount(value);
	};
	React.useEffect(() => {
		window.scrollTo(0, 0);
		getList({ id_product: id })
			.then()
			.catch((err) => console.log(err));
		arrayProduct.length > 0
			? setObjDetail(arrayProduct[0])
			: getProduct({ _id: id }, setObjDetail, 'getId');
	}, [id]);
	React.useEffect(() => {
		if (Object.values(objDetail).length > 0) {
			getProduct({ catalog_id: objDetail.catalog_id }, setProductSuggest);
			setImageActive(objDetail.image_destination[0]);
		}
	}, [objDetail]);

	return (
		<div>
			<Chung />
			{Object.values(objDetail).length === 0 ? (
				<div className={Styles.content_detail}>
					<div
						style={{
							color: 'red',
							fontSize: 50,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Empty description={'Không tìm thấy sản phẩm cần tìm'} />
						<span>404</span>
					</div>
				</div>
			) : (
				<div className={Styles.content_detail}>
					<div className={Styles.perimeter}>
						<div className={Styles.image}>
							<ReactImageMagnify
								{...{
									smallImage: {
										alt: 'Wristwatch by Ted Baker London',
										isFluidWidth: true,
										src: `${BASE_URL_IMAGE}${imageActive}`,
										// srcSet: srcSet,
										sizes: '(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw',
										className: 'mySlides',
									},
									largeImage: {
										alt: '',
										src: `${BASE_URL_IMAGE}${imageActive}`,
										width: 1200,
										height: 1200,
									},
									enlargedImageContainerStyle: {
										zIndex: '1500',
									},
									enlargedImageContainerDimensions: {
										width: '90%',
										height: '70%',
									},
									isHintEnabled: true,
								}}
							/>
							<div
								className={'flex_row'}
								style={{ marginTop: 10, justifyContent: 'center' }}
							>
								{objDetail.image_destination &&
									objDetail.image_destination.map((name) => (
										<img
											src={BASE_URL_IMAGE + name}
											style={{
												width: 65,
												height: 65,
												cursor: 'pointer',
												border: imageActive === name ? '1px solid red' : '1px solid #fff',
												objectFit: 'cover',
												marginLeft: 5,
											}}
											onClick={() => setImageActive(name)}
										/>
									))}
							</div>
						</div>
						<div className={Styles.copy}>
							<div className={Styles.copy_header_detail}>
								<h1>{objDetail.name}</h1>
								<div className={Styles.action_header_detail}>
									<div className={Styles.action_header_detail_item}>
										<Rate allowHalf value={valueCommentTB} style={{ fontSize: '18px' }} />
										<div className={Styles.action_binh_luan} style={{ marginLeft: 10 }}>
											{comments.filter((value) => value.id_comment === '-1').length} bình
											luận
										</div>
										<div className={Styles.action_thuong_hieu}>Thương hiệu: GCB</div>
										<div className={Styles.action_thuong_hieu}>
											<p>
												Mã SP:{' '}
												<span style={{ fontWeight: 'bold', color: '#e76633' }}>
													{objDetail._id}
												</span>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className={Styles.copy_content_detail}>
								<div className={Styles.copy_content_detail_item}>
									<div className={Styles.copy_content_detail_title}>Giá :</div>
									<div className={Styles.copy_content_detail_values}>
										{(
											(
												objDetail.price -
												(objDetail.price * objDetail.price_seo.split(' ')[0]) / 100
											).toFixed(2) * 1000
										)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'}
									</div>
									{objDetail.price_seo !== '0 %' ? (
										<div style={{ width: '50%' }}>
											<span
												className={Styles.old_price}
												style={{
													textDecoration: 'line-through',
													color: '#6b6b6b',
													fontSize: '18px',
													marginLeft: 8,
												}}
											>
												{(objDetail.price * 1000)
													.toString()
													.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ'}
											</span>
											<span className={Styles.label_km}>
												Tiết kiệm{' '}
												<span id="discount">
													{((objDetail.price * objDetail.price_seo.split(' ')[0]) / 100)
														.toString()
														.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' k'}
												</span>
											</span>
										</div>
									) : (
										<div style={{ width: '50%' }} />
									)}
								</div>
								<div className={Styles.copy_content_detail_item}>
									<div className={Styles.copy_content_detail_title}>Tình trạng :</div>
									<div className={Styles.copy_content_detail_tinh_trang}>
										{objDetail.amount - objDetail['sold'] > 0 ? 'Còn hàng' : 'Hết hàng'}
									</div>
									<div className={Styles.copy_content_detail_title}>Số lượng :</div>
									<div className={Styles.copy_content_detail_tinh_trang}>
										<InputNumber
											min={1}
											max={8}
											bordered
											defaultValue={1}
											onChange={onChangeNumber}
										/>
									</div>
								</div>
								<div className={Styles.copy_content_detail_item}>
									<div style={{ width: '30%', fontSize: '20px' }}>Vận chuyển :</div>
									<div className={Styles.copy_content_detail_van_chuyen}>
										<span>
											<strong>Miễn phí vận chuyển </strong>
											cho đơn hàng trên <span style={{ color: 'red' }}>200.000đ</span>
										</span>
									</div>
								</div>
								<div className={Styles.copy_action_detail}>
									{Object.keys(myUser).length > 0 ? (
										<React.Fragment>
											<div
												className={Styles.copy_action_mua}
												style={{
													display:
														objDetail.amount - objDetail['sold'] > 0 ? 'block' : 'none',
												}}
											>
												<Button
													type="primary"
													className={Styles.btn_detail}
													onClick={handleBuyProduct}
													style={{ width: 152.08 }}
												>
													Mua ngay
												</Button>
											</div>
											<div
												className={Styles.copy_action_gio}
												style={{
													display:
														objDetail.amount - objDetail['sold'] > 0 ? 'block' : 'none',
												}}
											>
												<Button
													className={Styles.btn_detail_them_vao_gio}
													onClick={handleAddCart}
													type="primary"
												>
													Thêm vào giỏ hàng
												</Button>
											</div>
										</React.Fragment>
									) : (
										<React.Fragment>
											<div
												className={Styles.copy_action_gio}
												style={{
													display:
														objDetail.amount - objDetail['sold'] > 0 ? 'block' : 'none',
												}}
											>
												<Button
													className={Styles.btn_detail}
													onClick={() => history.push('/login')}
													type="primary"
												>
													Đăng nhập để mua hàng
												</Button>
											</div>
											<div
												className={Styles.copy_action_mua}
												style={{
													display:
														objDetail.amount - objDetail['sold'] > 0 ? 'block' : 'none',
												}}
											>
												<Button
													type="primary"
													className={Styles.btn_detail}
													style={{ width: 'unset !important' }}
													onClick={() => history.push('/login')}
												>
													Đăng nhập để thêm vào giỏ hàng
												</Button>
											</div>
										</React.Fragment>
									)}
								</div>
								<div>
									Tổng đài mua hàng miễn cước{' '}
									<span style={{ color: '#ff3600', fontWeight: 'bold' }}>1800 6066</span>{' '}
									( Từ 8h đến 21h30 hằng ngày )
								</div>
								<div className={Styles.box_icon}>
									<div className={Styles.box_icon_item}>
										<span className={Styles.box_icon_ic_icon_ship} />
										<span>
											Giao hàng <br /> toàn quốc
										</span>
									</div>
									<div className={Styles.box_icon_item}>
										<span className={Styles.box_icon_bg_icon_ship} />
										<span>
											Đổi hàng 15 <br />
											ngày miễn phí
										</span>
									</div>
									<div className={Styles.box_icon_item}>
										<span className={Styles.box_icon_chinhhang} />
										<span>
											Đảm bảo hàng <br /> chính hãng
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={Styles.content_2}>
						<div className={Styles.title_banthich}>Có thể bạn thích</div>
						<div className={Styles.content_banthich}>
							{productSuggest.slice(0, 6).map((item) => (
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
					</div>
					<div className={Styles.content_3}>
						<div className={Styles._3wdEZ5_2}>
							<div className={Styles._2pGc2E}>MÔ TẢ SẢN PHẨM</div>
							<div className={Styles._1afiLm_1}>
								<div dangerouslySetInnerHTML={{ __html: objDetail.description }} />
							</div>
						</div>
					</div>
					<div className={Styles.content_4}>
						<div className={Styles.product_ratings__header}>BÌNH LUẬN VỀ SẢN PHẨM</div>
						<div className={Styles.item_binh_luan}>
							<div className={Styles.comment}>
								<CommentsContainer
									id_product={id}
									maxIndex={maxIndex}
									minIndex={minIndex}
								/>
							</div>
							<div className={Styles.pagination}>
								<Pagination
									size="small"
									pageSize={pageSize}
									current={current}
									total={comments.length}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className={Styles.footer_detail}>
				<Footer />
			</div>
		</div>
	);
}

DetailProduct.propTypes = {};

DetailProduct.defaultProps = {};

export default React.memo(DetailProduct);
