import React from 'react';

// component lazy
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register/register'));
const MainLayout = React.lazy(() => import('./components/MainLayout'));
const TestAPI = React.lazy(() => import('./components/Demo/testMaiDao'));
const LayoutAdmin = React.lazy(() => import('./components/Admin'));
const DetailProduct = React.lazy(() =>
	import('./components/Content/DetailProduct/DetailProduct')
);
const IntroduceProduct = React.lazy(() =>
	import('./components/Header/slider/introduceProduct/introduceProduct')
);
const BuyProduct = React.lazy(() =>
	import('./components/Content/DetailProduct/BuyProduct/BuyProduct')
);
const CartProduct = React.lazy(() => import('./components/CartProduct/CartProduct'));
const AccountMe = React.lazy(() => import('./components/Account/AccountMe'));
const LienHe = React.lazy(() =>
	import('./components/Header/slider/LienHeChungToi/LienHe')
);
const LoginAdmin = React.lazy(() => import('./components/Admin/Login/LoginAdmin'));
const TatCaSP = React.lazy(() => import('./components/Content/GoiYChoBan/TatCaSP'));
const WatchCatagory = React.lazy(() => import('./components/AllProduct/WatchCatagory'));
const AllFlashSale = React.lazy(() =>
	import('./components/Content/FlashSale/AllFlashSale/AllFlashSale')
);
const AllNoiBat = React.lazy(() =>
	import('./components/Content/Sanphamnoibat/AllNoiBat/AllNoiBat')
);

const RegisterAdmin = React.lazy(() =>
	import('./components/Admin/Register/registerAdmin')
);
const MenuAntd = React.lazy(() => import('./components/Admin/TestAntd/menuAntd'));
const ShoppingGuider = React.lazy(() =>
	import('./components/Header/ShoppingGuide/ShoppingGuide')
);

export default {
	MenuAntd,
	ShoppingGuider,
	RegisterAdmin,
	AllNoiBat,
	AllFlashSale,
	WatchCatagory,
	TatCaSP,
	LoginAdmin,
	LienHe,
	AccountMe,
	CartProduct,
	BuyProduct,
	IntroduceProduct,
	DetailProduct,
	LayoutAdmin,
	TestAPI,
	MainLayout,
	Register,
	Login,
};
