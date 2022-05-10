import React from 'react';
import ListPicture from './HeaderContent/listPicture';
import ProductListHot from './Sanphamnoibat/productListHot';
import 'antd/dist/antd.css';
import ProductListGoiYChoBan from './GoiYChoBan/productGoiYChoBan';
import FlashSale from './FlashSale/FlashSale';
import ProductListXuHuong from './XuHuongTimKiem/XuHuoongTimKiem';
import { useSelector } from 'react-redux';
import { ContextApp } from '../../context/contextApp';

//style
const listBanner = {
	width: '1200px',
	height: '235px',
	paddingTop: '25px',
	display: 'flex',
	justifyContent: 'center',
};
const productHot = {
	width: '1200px',
	height: '550px',
	paddingTop: '25px',
	display: 'flex',
	justifyContent: 'center',
};
const flashSale = {
	width: '1200px',
	height: '370px',
	paddingTop: '25px',
	display: 'flex',
	justifyContent: 'center',
};
const productXuHuong = {
	width: '1200px',
	height: '240px',
	paddingTop: '25px',
	display: 'flex',
	justifyContent: 'center',
};
const productGoiY = {
	width: '1200px',
	height: '2700px',
	paddingTop: '25px',
	display: 'flex',
	justifyContent: 'center',
};

function Content(props) {
	// hooks
	const product = useSelector((state) => state['product']);
	const { textSearch } = React.useContext(ContextApp);
	const isSearch = textSearch.length > 0;
	React.useEffect(() => {
		const scrollSearch = setTimeout(() => {
			window.scroll(0, 400);
		}, 0);
		return () => {
			clearTimeout(scrollSearch);
		};
	}, [isSearch]);
	const productFilter = () => {
		let productNew = {};

		const priceString = (item) =>
			(item.price * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' đ';
		const arrSearch = Object.values(product).filter(
			(item) =>
				item.name.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1 ||
				priceString(item).toLowerCase().indexOf(`${textSearch}`.toLowerCase()) !== -1
		);
		arrSearch.map((item) => {
			productNew[item._id] = item;
		});
		return { ...productNew };
	};

	return (
		<div
			style={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{!isSearch && (
				<React.Fragment>
					{/*<div style={listBanner}>*/}
					{/*	<ListPicture />*/}
					{/*</div>*/}
					<div style={flashSale}>
						<FlashSale product={product} />
					</div>
					{/*<div style={productHot}>*/}
					{/*	<ProductListHot />*/}
					{/*</div>*/}
					{/*<div style={productXuHuong}>*/}
					{/*	<ProductListXuHuong />*/}
					{/*</div>*/}
				</React.Fragment>
			)}
			<div style={productGoiY}>
				<ProductListGoiYChoBan isSearch={isSearch} product={productFilter()} />
			</div>
		</div>
	);
}

export default React.memo(Content);
