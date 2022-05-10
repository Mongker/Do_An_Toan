/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

// component
import LoadingBase from '../../../baseComponent/LoadingBase';

// styles
import './styles.css';

// const component lazy
const Home = React.lazy(() => import('./Home/Home'));
const User = React.lazy(() => import('./User/User'));
const Slider = React.lazy(() => import('./Slider/Slider'));
const DanhMuc = React.lazy(() => import('./DanhMuc/DanhMuc'));
const SanPham = React.lazy(() => import('./SanPham/SanPham'));
const DonDatHang = React.lazy(() => import('./DonDatHang/DonDatHang'));
const KhachHang = React.lazy(() => import('./KhachHang/KhachHang'));
const CaiDat = React.lazy(() => import('./CaiDatTaiKhoan/CaiDat'));

function ContentAdmin(props) {
	const { checkKey, objectKey } = props;
	let componentContent;
	switch (checkKey) {
		case objectKey.TRANG_CHU:
			componentContent = <Home />;
			break;
		case objectKey.NHAN_VIEN:
			componentContent = <User />;
			break;
		case objectKey.SLIDER:
			componentContent = <Slider />;
			break;
		case objectKey.DANH_MUC:
			componentContent = <DanhMuc />;
			break;
		case objectKey.SAN_PHAM:
			componentContent = <SanPham />;
			break;
		case objectKey.DON_HANG:
			componentContent = <DonDatHang />;
			break;
		case objectKey.KHACH_HANG:
			componentContent = <KhachHang />;
			break;
		case objectKey.CAI_DAT:
			componentContent = <CaiDat />;
			break;
	}
	return (
		<React.Suspense fallback={<LoadingBase />}>
			<div
				className={'layout_content'}
				style={{ padding: 24, minHeight: 360, borderRadius: '4%' }}
			>
				{componentContent}
			</div>
		</React.Suspense>
	);
}

ContentAdmin.propTypes = {
	checkKey: PropTypes.string.isRequired,
	objectKey: PropTypes.object.isRequired,
};

export default React.memo(ContentAdmin);
