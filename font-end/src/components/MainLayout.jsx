/* eslint-disable */
import React from 'react';
import IndexHeader from './Header/index_header';
import Content from './Content/Content';
import Footer from './Footer/footer';
import { useDispatch } from 'react-redux';
import baseAPI from '../axios/baseAPI';
import { TypeApi } from '../util/TypeApi';
import { TYPE_ACTION } from '../actions/TypeAction';
// import PropTypes from 'prop-types';

// const
const styleForm = {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	// height: '100%',
};

function MainLayout() {
	// hooks
	const dispatch = useDispatch();

	// handle func
	const handleGetList = async () => {
		const data = await baseAPI.getAll(TypeApi.product);
		dispatch({ type: TYPE_ACTION.PRODUCT.GET_ALL_PRODUCT, payload: { data } });
	};

	React.useEffect(() => {
		handleGetList().then();
	}, []);
	return (
		<div style={styleForm}>
			<div className="header">
				<IndexHeader />
			</div>
			<div className="content">
				<Content />
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	);
}

MainLayout.propTypes = {};

MainLayout.defaultProps = {};

export default React.memo(MainLayout);
